#!/bin/bash

time=5

getTime() {
    echo "$time" > /tmp/time_value
}

#while [ "$time" -lt 5 ];
#do
#    ((time+=1))
#    #1초 대기
#    sleep 1
#done