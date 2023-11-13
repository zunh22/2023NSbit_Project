#!/bin/bash

while true; do
    #container_names=($(docker ps --format "{{.Names}}"))
    container_names="attack_phpmyadmin_1"
    for container_name in "${container_names[@]}"; do
        ./test11.sh "$container_name" &
    done

    sleep 62
done
