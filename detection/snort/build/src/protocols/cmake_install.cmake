# Install script for directory: /home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "RelWithDebInfo")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/snort/protocols" TYPE FILE FILES
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/arp.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/bpdu.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/cdp.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/cisco_meta_data.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/eapol.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/eth.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/icmp4.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/icmp6.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/ip.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/ipv4.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/ipv4_options.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/ipv6.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/geneve.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/gre.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/layer.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/linux_sll.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/mpls.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/packet.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/packet_manager.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/protocol_ids.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/ssl.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/tcp.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/tcp_options.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/teredo.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/token_ring.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/udp.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/wlan.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/protocols/vlan.h"
    )
endif()

