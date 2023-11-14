#!/bin/bash

echo "Enter container names separated by space:"
read -a container_names

while true; do
    for container_name in "${container_names[@]}"; do
        ./test11.sh "$container_name" &
    done

    sleep 62
done