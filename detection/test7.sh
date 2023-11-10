#!/bin/bash

while true; do
    container_names=($(docker ps --format "{{.Names}}"))

    for container_name in "${container_names[@]}"; do
        ./test11.sh "$container_name" &
    done

    sleep 62
done
