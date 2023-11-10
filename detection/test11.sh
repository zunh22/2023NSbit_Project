#!/bin/bash

container_name="$1"
date
timeout 60 docker exec "$container_name" tcpdump -i eth0 -nn -e -vvv -tttt >> /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt

db_user="root"
db_pw="1234pkj"
db_name="project"
whitelist_table="whitelist"
rule_table="rule"

line2=""
syn_count=0

while IFS= read -r line; do
    # protocol is ARP / TCP
    if echo "$line" | grep -q "$protocol"; then
        syn_detected=false
        arp_detected=false

        query="SELECT protocol FROM $rule_table"
        while IFS= read -r proto; do
			echo "$proto"
            if echo "$line" | grep -q "ARP"; then
                query2="SELECT mac FROM $whitelist_table WHERE ip='$ip_address'"
                packet_mac=$(mysql -u $db_user -p$db_pw -D $db_name -se "$query2")

                if [ "$mac_address" != "$packet_mac" ]; then
                    echo "alert!!"
                    arp_detected=true
                fi

            elif echo "$line" | grep -q "TCP"; then
                IFS= read -r line2
				echo "$line2 : line2"
                sip=$(echo "$line2" | awk -F' > ' '{print $1}' | cut -d. -f1-4)
                dip=$(echo "$line2" | awk -F' > ' '{print $2}' | cut -d. -f1-4)
                sport=$(echo "$line2" | awk -F'[ .:]' '{print $9}')
                dport=$(echo "$line2" | awk -F'[ .:]' '{print $15}')
                flags=$(echo "$line2" | awk -F'\\[|\\]' '{print $2}' | cut -c1)

                echo "sip : $sip / dip : $dip / sport : $sport / dport : $dport / flags : $flags / flag : $flag"

                if [ "$src_ip" != "any" ]; then
                    if [ "$src_ip" != "$sip" ]; then
                        syn_detected=false
                    fi
                fi

                if [ "$src_port" != "any" ]; then
                    if [ "$src_port" != "$sport" ]; then
                        syn_detected=false
                    fi
                fi

                if [ "$dst_ip" != "any" ]; then
                    if [ "$dst_ip" != "$dip" ]; then
                        syn_detected=false
                    fi
                fi

                if [ "$dst_port" != "any" ]; then
                    if [ "$dst_port" != "$dport" ]; then
                        syn_detected=false
                    fi
                fi

                if [ "$flags" != "$flag" ]; then
                    syn_detected=false
                fi

                ((syn_count++))

            fi
        done < <(mysql -u $db_user -p"$db_pw" -D $db_name -se "$query")

    fi
done < /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt

if [ $syn_count -ge 300 ]; then
    echo "SYN"
fi