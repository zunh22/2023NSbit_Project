# Install script for directory: /home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/snort/utils" TYPE FILE FILES
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/boyer_moore.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/cpp_macros.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/endian.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/event_gen.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/infractions.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/kmap.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/memcap_allocator.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/primed_allocator.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/safec.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/segment_mem.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/sflsq.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/stats.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/util.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/util_ber.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/util_cstring.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/util_unfold.h"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/src/utils/util_utf.h"
    )
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/hyeyeon/snort_src/snort3-3.1.18.0/build/src/utils/test/cmake_install.cmake")

endif()

