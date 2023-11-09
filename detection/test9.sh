#!/bin/bash

container_name="$1"

# 파일을 한 번만 읽고 처리하기 위한 코드
date
timeout 60 docker exec "$container_name" sudo tcpdump -w /tcpdump.pcap -i eth0 -nn -vvv -tttt -X

# 파일 복사
docker cp "$container_name":/tcpdump.pcap /home/hyeyeon/tcpdump_$container_name.pcap

sudo tcpdump -r /home/hyeyeon/tcpdump_$container_name.pcap -n -e -tttt | tee /home/hyeyeon/tcpdump_$container_name.txt | while IFS= read -r line; do
    if echo "$line" | grep -q "Flags \[S\]"; then
        ((syn_count++))

        if [ "$syn_count" -ge 100 ]; then
            grep "Flags \[S\]" /home/hyeyeon/tcpdump_$container_name.txt | head -n 1
            break
        fi
    fi
done

db_user="root"
db_password="gpdus0405"
db_database="project"
table_name="whitelist"

while IFS= read -r line; do
    protocol=$(echo "$line" | awk '{print $2}')

    if [ "$protocol" == "ARP," ]; then
        mac_address=$(echo "$line" | awk '{print $5}')
        ip_address=$(echo "$line" | awk '{print $12}')

        query="SELECT mac FROM $table_name WHERE ip='$ip_address'"

        packet_mac=$(mysql -u $db_user -p$db_password -D $db_database -se "$query")

        if [ "$mac_address" != "$packet_mac" ]; then
            echo "ARP alert!!!" >> /home/hyeyeon/tcpdump_$container_name.txt
        fi
    fi
done < /home/hyeyeon/tcpdump_$container_name.txt

