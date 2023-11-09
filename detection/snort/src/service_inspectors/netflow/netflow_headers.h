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

// netflow.h author Ron Dempster <rdempste@cisco.com>
//                  Shashikant Lad <shaslad@cisco.com>

#ifndef NETFLOW_HEADERS_H
#define NETFLOW_HEADERS_H

#include "flow/flow.h"

#define NETFLOW_MIN_COUNT 1
#define NETFLOW_MAX_COUNT 256
#define MAX_TIME 2145916799

enum NetflowFieldTypes : uint16_t
{
    NETFLOW_IN_BYTES = 1,
    NETFLOW_IN_PKTS = 2,
    NETFLOW_PROTOCOL = 4,
    NETFLOW_SRC_TOS = 5,
    NETFLOW_TCP_FLAGS = 6,
    NETFLOW_SRC_PORT = 7,
    NETFLOW_SRC_IP = 8,
    NETFLOW_SRC_MASK = 9,
    NETFLOW_SNMP_IN = 10,
    NETFLOW_DST_PORT = 11,
    NETFLOW_DST_IP = 12,
    NETFLOW_DST_MASK = 13,
    NETFLOW_SNMP_OUT = 14,
    NETFLOW_IPV4_NEXT_HOP = 15,
    NETFLOW_SRC_AS = 16,
    NETFLOW_DST_AS = 17,
    NETFLOW_LAST_PKT = 21,
    NETFLOW_FIRST_PKT = 22,
    NETFLOW_SRC_IPV6 = 27,
    NETFLOW_DST_IPV6 = 28,
    NETFLOW_SRC_MASK_IPV6 = 29,
    NETFLOW_DST_MASK_IPV6 = 30,
    NETFLOW_DST_TOS = 55
};

struct NetflowSessionRecord
{
    snort::SfIp initiator_ip;
    snort::SfIp responder_ip;
    snort::SfIp next_hop_ip;
    uint8_t proto;
    uint16_t initiator_port;
    uint16_t responder_port;
    uint32_t first_pkt_second;
    uint32_t last_pkt_second;
    uint64_t initiator_pkts;
    uint64_t responder_pkts;
    uint64_t initiator_bytes;
    uint64_t responder_bytes;
    uint8_t tcp_flags;

    uint32_t nf_src_as;
    uint32_t nf_dst_as;
    uint32_t nf_snmp_in;
    uint32_t nf_snmp_out;
    uint8_t nf_src_tos;
    uint8_t nf_dst_tos;
    uint8_t nf_src_mask;
    uint8_t nf_dst_mask;
};

struct Netflow5Hdr
{
    uint16_t version;               // Netflow export format version number
    uint16_t flow_count;            // Number of flows exported in this packet(1-30)
    uint32_t sys_uptime;            // Current time in milliseconds since the export device booted
    uint32_t unix_secs;             // Current count of seconds since 0000 UTC 1970
    uint32_t unix_nsecs;            // Residual nanoseconds since 0000 UTC 1970
    uint32_t flow_sequence;         // Sequence counter of total flows seen
    uint8_t engine_type;            // Type of flow-switching engine
    uint8_t engine_id;              // Slot number of the flow-switching engine
    uint16_t sampling_interval;     // First two bits hold the sampling mode; remaining 14 bits hold value of sampling interval
};

struct Netflow5RecordHdr
{
    uint32_t flow_src_addr;         // Source IP address
    uint32_t flow_dst_addr;         // Destination IP address
    uint32_t next_hop_addr;         // IP address of next hop router
    uint16_t snmp_if_in;            // SNMP index of input interface
    uint16_t snmp_if_out;           // SNMP index of output interface
    uint32_t pkt_count;             // Packets in the flow
    uint32_t bytes_sent;            // Total number of Layer 3 bytes in the packets of the flow
    uint32_t flow_first;            // System uptime at start of flow
    uint32_t flow_last;             // System uptime at the time the last packet of the flow was received
    uint16_t src_port;              // TCP/UDP source port number or equivalent
    uint16_t dst_port;              // TCP/UDP destination port number or equivalent
    uint8_t pad1;                   // Unused (zero) bytes
    uint8_t tcp_flags;              // Cumulative OR of TCP flags
    uint8_t flow_protocol;          // IP protocol type (for example, TCP = 6; UDP = 17)
    uint8_t tos;                    // IP type of service
    uint16_t src_as;                // Autonomous system number of the source, either origin or peer
    uint16_t dst_as;                // Autonomous system number of the destination, either origin or peer
    uint8_t src_mask;               // Source address prefix mask bits
    uint8_t dst_mask;               // Destination address prefix mask bits
    uint16_t pad2;                  // Unused (zero) bytes
};

struct Netflow9Hdr
{
    uint16_t version;               // The version of netflow records exported in this packet;
    uint16_t flow_count;            // Number of FlowSet records (both template and data) contained within this packet
    uint32_t sys_uptime;            // Time in milliseconds since this device was first booted
    uint32_t unix_secs;             // Seconds since 0000 Coordinated Universal Time (UTC) 1970
    uint32_t sequence_num;          // Incremental sequence counter of all export packets sent by this export device;
    uint32_t source_id;             // A 32-bit value that identifies the Exporter Observation Domain
};

struct Netflow9FlowSet
{
    uint16_t field_id;
    uint16_t field_length;
};

struct Netflow9Template
{
    uint16_t template_id;
    uint16_t template_field_count;
};

struct Netflow9TemplateField
{
    uint16_t field_type;
    uint16_t field_length;

    Netflow9TemplateField(uint16_t type, uint16_t length)
        : field_type(type)
        , field_length(length)
    {}
};
#endif
