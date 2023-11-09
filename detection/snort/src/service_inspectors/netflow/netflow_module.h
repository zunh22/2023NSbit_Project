//--------------------------------------------------------------------------
// Copyright (C) 2020-2021 Cisco and/or its affiliates. All rights reserved.
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License Version 2 as published
// by the Free Software Foundation.  You may not use, modify or distribute
// this program under any other version of the GNU General Public License.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//--------------------------------------------------------------------------

// netflow_module.h author Shashikant Lad <shaslad@cisco.com>


#ifndef NETFLOW_MODULE_H
#define NETFLOW_MODULE_H

#include <unordered_map>

#include "framework/module.h"
#include "sfip/sf_cidr.h"
#include "utils/util.h"

#define NETFLOW_NAME "netflow"
#define NETFLOW_HELP "netflow inspection"

namespace snort
{
struct SnortConfig;
}

#define NETFLOW_MAX_ZONES 1024
#define NETFLOW_ANY_ZONE (-1)

//  Used to create hash of key for indexing into cache.
struct NetflowHash
{
    size_t operator()(const snort::SfIp& ip) const
    {
        const uint64_t* ip64 = (const uint64_t*) ip.get_ip6_ptr();
        return std::hash<uint64_t>() (ip64[0]) ^
               std::hash<uint64_t>() (ip64[1]);
    }
};

// Generate hash of template id and device ip
struct TemplateIpHash
{
    size_t operator()(const std::pair<uint16_t, snort::SfIp> &ti) const
    {
        const uint64_t* ip64 = (const uint64_t*) ti.second.get_ip6_ptr();

        return std::hash<uint64_t>() (ip64[0]) ^
               std::hash<uint64_t>() (ip64[1]) ^
               std::hash<uint64_t>() ((uint64_t)ti.first);
    }
};

struct NetflowRule
{
    NetflowRule() { reset(); }
    void reset()
    {
        networks.clear();
        zones.clear();
        create_host = create_service = false;
    }

    bool filter_match(const snort::SfIp* ip, const int zone) const
    {
        bool zone_match = false;
        if ( zones.empty() )
            zone_match = true;
        else
        {
            for( int z : zones)
            {
                if ( z == NETFLOW_ANY_ZONE or z == zone )
                {
                    zone_match = true;
                    break;
                }
            }
        }
        if ( !zone_match )
            return false;

        if ( networks.empty() )
            return true;
        for( auto const &net : networks )
            if ( net.contains(ip) == SFIP_CONTAINS )
                return true;

        return false;
    }

    std::vector <snort::SfCidr> networks;
    std::vector <int> zones;
    bool create_host = false;
    bool create_service = false;
};

using NetflowRuleList = std::vector<NetflowRule>;
struct NetflowRules
{
    NetflowRuleList exclude;
    NetflowRuleList include;
};

struct NetflowConfig
{
    NetflowConfig() { }
    const char* dump_file = nullptr;
    std::unordered_map <snort::SfIp, NetflowRules, NetflowHash> device_rule_map;
    uint32_t update_timeout = 0;
};

struct NetflowStats
{
    PegCount invalid_netflow_record;
    PegCount packets;
    PegCount records;
    PegCount unique_flows;
    PegCount v9_missing_template;
    PegCount v9_options_template;
    PegCount v9_templates;
    PegCount version_5;
    PegCount version_9;
};

extern THREAD_LOCAL NetflowStats netflow_stats;
extern THREAD_LOCAL snort::ProfileStats netflow_perf_stats;

class NetflowModule : public snort::Module
{
public:
    NetflowModule();
    ~NetflowModule() override;

    bool set(const char*, snort::Value&, snort::SnortConfig*) override;
    bool begin(const char*, int, snort::SnortConfig*) override;
    bool end(const char*, int, snort::SnortConfig*) override;

    const PegInfo* get_pegs() const override;
    PegCount* get_counts() const override;
    snort::ProfileStats* get_profile() const override;
    NetflowConfig* get_data();

    Usage get_usage() const override
    { return INSPECT; }

    bool is_bindable() const override
    { return true; }

private:
    NetflowConfig* conf = nullptr;
    NetflowRule rule_cfg = {};
    snort::SfIp device_ip_cfg = {};
    bool is_exclude_rule = false;
};

#endif
