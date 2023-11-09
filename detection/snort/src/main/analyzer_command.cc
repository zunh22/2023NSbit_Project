//--------------------------------------------------------------------------
// Copyright (C) 2016-2021 Cisco and/or its affiliates. All rights reserved.
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
// analyzer_command.cc author Michael Altizer <mialtize@cisco.com>

#ifdef HAVE_CONFIG_H
#include "config.h"
#endif

#include "analyzer_command.h"

#include <cassert>

#include "control/control.h"
#include "framework/module.h"
#include "log/messages.h"
#include "managers/module_manager.h"
#include "protocols/packet_manager.h"
#include "target_based/host_attributes.h"
#include "utils/stats.h"

#include "analyzer.h"
#include "reload_tracker.h"
#include "snort.h"
#include "snort_config.h"
#include "swapper.h"

using namespace snort;

bool ACStart::execute(Analyzer& analyzer, void**)
{
    analyzer.start();
    return true;
}

bool ACRun::execute(Analyzer& analyzer, void**)
{
    analyzer.run(paused);
    paused = false;
    return true;
}

bool ACStop::execute(Analyzer& analyzer, void**)
{
    analyzer.stop();
    return true;
}

bool ACPause::execute(Analyzer& analyzer, void**)
{
    analyzer.pause();
    return true;
}

bool ACResume::execute(Analyzer& analyzer, void**)
{
    analyzer.resume(msg_cnt);
    return true;
}

bool ACRotate::execute(Analyzer& analyzer, void**)
{
    analyzer.rotate();
    return true;
}

bool ACGetStats::execute(Analyzer&, void**)
{
    // FIXIT-P This incurs locking on all threads to retrieve stats.  It
    // could be reimplemented to optimize for large thread counts by
    // retrieving stats in the command and accumulating in the main thread.
    PacketManager::accumulate();
    ModuleManager::accumulate();
    return true;
}

ACGetStats::~ACGetStats()
{

    // FIXIT-L This should track the owner so it can dump stats to the
    // shell instead of the logs when initiated by a shell command
    DropStats(ctrlcon);
    LogRespond(ctrlcon, "==================================================\n"); // Marking End of stats

    ModuleManager::clear_global_active_counters();
}

bool ACResetStats::execute(Analyzer&, void**)
{
    ModuleManager::reset_stats(requested_type);
    return true;
}

ACResetStats::ACResetStats(clear_counter_type_t requested_type_l) : requested_type(
        requested_type_l) { }

ACSwap::ACSwap(Swapper* ps, ControlConn *ctrlcon) : ps(ps), ctrlcon(ctrlcon)
{ }

bool ACSwap::execute(Analyzer& analyzer, void** ac_state)
{
    if (ps)
    {
        ps->apply(analyzer);

        const SnortConfig* sc = ps->get_new_conf();
        if ( sc )
        {
            std::list<ReloadResourceTuner*>* reload_tuners;

            if ( !*ac_state )
            {
                reload_tuners = new std::list<ReloadResourceTuner*>(sc->get_reload_resource_tuners());
                std::list<ReloadResourceTuner*>::iterator rtt = reload_tuners->begin();
                while ( rtt != reload_tuners->end() )
                {
                    if ( (*rtt)->tinit() )
                        ++rtt;
                    else
                        rtt = reload_tuners->erase(rtt);
                }
                *ac_state = reload_tuners;
            }
            else
                reload_tuners = (std::list<ReloadResourceTuner*>*)*ac_state;

            if ( !reload_tuners->empty() )
            {
                auto rrt = reload_tuners->front();
                if ( analyzer.is_idling() )
                {
                    if ( rrt->tune_idle_context() )
                        reload_tuners->pop_front();
                }
                else
                {
                    if ( rrt->tune_packet_context() )
                        reload_tuners->pop_front();
                }
            }

            // check for empty again and free list instance if we are done
            if ( reload_tuners->empty() )
            {
                delete reload_tuners;
                ps->finish(analyzer);
                return true;
            }

            return false;
        }
    }

    return true;
}

ACSwap::~ACSwap()
{
    if (ps)
    {
        SnortConfig* sc = ps->get_new_conf();
        if ( sc )
            sc->clear_reload_resource_tuner_list();
    }
    delete ps;
    HostAttributesManager::swap_cleanup();

    ReloadTracker::end(ctrlcon);
    LogMessage("== reload complete\n");
    if (ctrlcon && !ctrlcon->is_local())
        ctrlcon->respond("== reload complete\n");
}

ACHostAttributesSwap::ACHostAttributesSwap(ControlConn *ctrlcon)
    : ctrlcon(ctrlcon)
{ }

bool ACHostAttributesSwap::execute(Analyzer&, void**)
{
    HostAttributesManager::initialize();
    return true;
}

ACHostAttributesSwap::~ACHostAttributesSwap()
{
    HostAttributesManager::swap_cleanup();
    ReloadTracker::end(ctrlcon);
    LogMessage("== reload host attributes complete\n");
    if (ctrlcon && !ctrlcon->is_local())
        ctrlcon->respond("== reload host attributes complete\n");
}

bool ACDAQSwap::execute(Analyzer& analyzer, void**)
{
    analyzer.reload_daq();
    return true;
}

ACDAQSwap::~ACDAQSwap()
{
    LogMessage("== daq module reload complete\n");
}

SFDAQInstance* AnalyzerCommand::get_daq_instance(Analyzer& analyzer)
{
    return analyzer.get_daq_instance();
}
