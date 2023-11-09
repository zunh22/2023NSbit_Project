# Install script for directory: /home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/snort/network_inspectors/rna" TYPE FILE FILES
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_fingerprint.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_fingerprint_smb.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_fingerprint_tcp.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_fingerprint_ua.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_fingerprint_udp.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_flow.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_inspector.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_logger.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_name.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/network_inspectors/rna/rna_cpe_os.h"
    )
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/hyeyeon/snort_src/snort3-3.1.18.0/build/src/network_inspectors/rna/test/cmake_install.cmake")

endif()

