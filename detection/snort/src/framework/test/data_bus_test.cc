//--------------------------------------------------------------------------
// Copyright (C) 2019-2021 Cisco and/or its affiliates. All rights reserved.
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
// data_bus_test.cc author Steven Baigal <sbaigal@cisco.com>

#ifdef HAVE_CONFIG_H
#include "config.h"
#endif

#include "framework/data_bus.h"
#include "main/snort_config.h"


#include <CppUTest/CommandLineTestRunner.h>
#include <CppUTest/TestHarness.h>
#include <CppUTestExt/MockSupport.h>

using namespace snort;

//--------------------------------------------------------------------------
// mocks
//--------------------------------------------------------------------------
InspectionPolicy::InspectionPolicy(unsigned int) {}
InspectionPolicy::~InspectionPolicy() = default;
NetworkPolicy::NetworkPolicy(unsigned int, unsigned int) {}
NetworkPolicy::~NetworkPolicy() = default;
namespace snort
{
SnortConfig::SnortConfig(snort::SnortConfig const*, const char*)
{ }

const SnortConfig* SnortConfig::get_conf()
{
    const SnortConfig* snort_conf =
        (const SnortConfig*)mock().getData("snort_conf").getObjectPointer();
    return snort_conf;
}

SnortConfig* SnortConfig::get_main_conf()
{
    SnortConfig* snort_conf =
        (SnortConfig*)mock().getData("snort_conf").getObjectPointer();
    return snort_conf;
}

SnortConfig::~SnortConfig()
{ }

NetworkPolicy* get_network_policy()
{
    NetworkPolicy* my_network_policy =
        (NetworkPolicy*)mock().getData("my_network_policy").getObjectPointer();
    return my_network_policy;
}

InspectionPolicy* get_inspection_policy()
{
    InspectionPolicy* my_inspection_policy =
        (InspectionPolicy*)mock().getData("my_inspection_policy").getObjectPointer();
    return my_inspection_policy;
}

}

//--------------------------------------------------------------------------
class UTestEvent : public DataEvent
{
public:
    UTestEvent(int m) : msg(m) { }

    int get_message()
    { return msg; }

private:
    int msg;
};

class UTestHandler : public DataHandler
{
public:
    UTestHandler(unsigned u = 0) : DataHandler("unit_test")
    { if ( u ) order = u; }

    void handle(DataEvent&, Flow*) override;

    int evt_msg = 0;
    unsigned seq = 99;
};

static unsigned s_next = 0;

void UTestHandler::handle(DataEvent& event, Flow*)
{
    UTestEvent* evt = (UTestEvent*)&event;
    evt_msg = evt->get_message();
    seq = ++s_next;
}

#define DB_UTEST_EVENT "unit.test.event"

//--------------------------------------------------------------------------
// data bus unit tests
//--------------------------------------------------------------------------

TEST_GROUP(data_bus)
{
    SnortConfig snort_conf;
    InspectionPolicy my_inspection_policy;
    NetworkPolicy my_network_policy;

    void setup() override
    {
        mock().setDataObject("snort_conf", "SnortConfig", &snort_conf);
        mock().setDataObject("my_network_policy", "NetworkPolicy", &my_network_policy);
        mock().setDataObject("my_inspection_policy", "InspectionPolicy", &my_inspection_policy);
    }

    void teardown() override
    {
        mock().clear();
    }
};

TEST(data_bus, subscribe_network)
{
    UTestHandler* h = new UTestHandler();
    DataBus::subscribe_network(DB_UTEST_EVENT, h);

    UTestEvent event(100);
    DataBus::publish(DB_UTEST_EVENT, event);
    CHECK(100 == h->evt_msg);

    UTestEvent event1(200);
    DataBus::publish(DB_UTEST_EVENT, event1);
    CHECK(200 == h->evt_msg);

    DataBus::unsubscribe_network(DB_UTEST_EVENT, h);

    UTestEvent event2(300);
    DataBus::publish(DB_UTEST_EVENT, event2);
    CHECK(200 == h->evt_msg); // unsubscribed!

    delete h;
}

TEST(data_bus, subscribe)
{
    UTestHandler* h = new UTestHandler();
    DataBus::subscribe(DB_UTEST_EVENT, h);

    UTestEvent event(100);
    DataBus::publish(DB_UTEST_EVENT, event);
    CHECK(100 == h->evt_msg);

    UTestEvent event1(200);
    DataBus::publish(DB_UTEST_EVENT, event1);
    CHECK(200 == h->evt_msg);

    DataBus::unsubscribe(DB_UTEST_EVENT, h);

    UTestEvent event2(300);
    DataBus::publish(DB_UTEST_EVENT, event2);
    CHECK(200 == h->evt_msg); // unsubscribed!

    delete h;
}

TEST(data_bus, order1)
{
    UTestHandler* h0 = new UTestHandler();
    DataBus::subscribe(DB_UTEST_EVENT, h0);

    UTestHandler* h1 = new UTestHandler(1);
    DataBus::subscribe(DB_UTEST_EVENT, h1);

    UTestHandler* h9 = new UTestHandler(9);
    DataBus::subscribe(DB_UTEST_EVENT, h9);

    s_next = 0;
    UTestEvent event(100);
    DataBus::publish(DB_UTEST_EVENT, event);

    CHECK(1 == h1->seq);
    CHECK(2 == h9->seq);
    CHECK(3 == h0->seq);

    DataBus::unsubscribe(DB_UTEST_EVENT, h0);
    DataBus::unsubscribe(DB_UTEST_EVENT, h1);
    DataBus::unsubscribe(DB_UTEST_EVENT, h9);

    delete h0;
    delete h1;
    delete h9;
}

TEST(data_bus, order2)
{
    UTestHandler* h0 = new UTestHandler(0);
    DataBus::subscribe(DB_UTEST_EVENT, h0);

    UTestHandler* h9 = new UTestHandler(9);
    DataBus::subscribe(DB_UTEST_EVENT, h9);

    UTestHandler* h1 = new UTestHandler(1);
    DataBus::subscribe(DB_UTEST_EVENT, h1);

    s_next = 0;
    UTestEvent event(100);
    DataBus::publish(DB_UTEST_EVENT, event);

    CHECK(1 == h1->seq);
    CHECK(2 == h9->seq);
    CHECK(3 == h0->seq);

    DataBus::unsubscribe(DB_UTEST_EVENT, h0);
    DataBus::unsubscribe(DB_UTEST_EVENT, h1);
    DataBus::unsubscribe(DB_UTEST_EVENT, h9);

    delete h0;
    delete h1;
    delete h9;
}

//-------------------------------------------------------------------------
// main
//-------------------------------------------------------------------------

int main(int argc, char** argv)
{
    return CommandLineTestRunner::RunAllTests(argc, argv);
}

