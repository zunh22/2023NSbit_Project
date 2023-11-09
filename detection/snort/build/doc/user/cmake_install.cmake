# Install script for directory: /home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/doc/snort" TYPE FILE FILES
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/active.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/appid.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/binder.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/byte_extract.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/byte_jump.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/byte_math.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/byte_options.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/byte_test.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/concepts.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/connectors.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/dump_config.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/daq.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/dcerpc.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/errors.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/features.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/file_processing.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/ftp.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/high_availability.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/http_inspect.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/http2_inspect.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/iec104.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/overview.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/params.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/perf_monitor.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/pop_imap.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/port_scan.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/sensitive_data.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/side_channel.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/smtp.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/snort2x.png"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/snort3x.png"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/snort_user.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/snorty.png"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/telnet.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/terms.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/trace.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/tutorial.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/usage.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/wizard.txt"
    "/home/hyeyeon/snort_src/snort3-3.1.18.0/doc/user/snort_user.text"
    )
endif()

