#!/bin/bash
container_name="$1"

date

timeout 60 docker exec "$container_name" tcpdump -i eth0 -nn -e -vvv -tttt >> /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt

db_user="root"
db_pw="1234pkj"
db_name="project"
whitelist_table="whitelist"
rule_table="rule"

protocol=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT protocol FROM $rule_table")
src_ip=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT src_ip FROM $rule_table")
src_port=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT src_port FROM $rule_table")
dst_ip=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT dst_ip FROM $rule_table")
dst_port=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT dst_port FROM $rule_table")
option=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT option FROM $rule_table")
flag=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT flag FROM $rule_table")

line2=""
syn_count=0
reset_interval=3
last_reset_time=$SECONDS

function reset_packet_count() {
    echo "Resetting packet count!!!!!!!!!!!!!!!!!!!!!"
    syn_count=0
    last_reset_time=$SECONDS
}

while IFS= read -r line; do
	#protocol is ARP / TCP

    # 일정 시간이 경과하면 즉시 초기화
    time_difference=$((SECONDS - last_reset_time))

    if ((time_difference >= reset_interval)); then
        reset_packet_count
    fi

	if echo "$line" | grep -q "$protocol"; then
		arp_detected=true

        IFS= read -r line2
        query="SELECT protocol, src_ip, src_port, dst_ip, dst_port, option, flag FROM $rule_table"

        if echo "$line" | grep -q "ARP"; then

                query2="SELECT mac FROM $whitelist_table WHERE ip='$ip_address'"
                packet_mac=$(mysql -u $db_user -p$db_pw -D $db_name -se "$query2")
                
                if [ "$mac_address" != "$packet_mac" ]; then
                        echo "alert!!"
                        arp_detected=true
                fi

        elif echo "$line" | grep -q "TCP"; then
            sip=$(echo "$line2" | awk -F' > ' '{print $1}' | cut -d. -f1-4)
            dip=$(echo "$line2" | awk -F' > ' '{print $2}' | cut -d. -f1-4)
            sport=$(echo "$line2" | awk -F'[ .:]' '{print $9'})
            dport=$(echo "$line2" | awk -F'[ .:]' '{print $15}')
            flags=$(echo "$line2" | awk -F'\\[|\\]' '{print $2}' | cut -c1)

            while IFS= read -r rule; do
                syn_detected=true
                r_protocol=$(echo "$rule" | awk -F' ' '{print $1}')
                r_src_ip=$(echo "$rule" | awk -F' ' '{print $2}')
                r_src_port=$(echo "$rule" | awk -F' ' '{print $3}')
                r_dst_ip=$(echo "$rule" | awk -F' ' '{print $4}')
                r_dst_port=$(echo "$rule" | awk -F' ' '{print $5}')
                r_option=$(echo "$rule" | awk -F' ' '{print $6}')
                r_second=$(echo "$r_option" | awk -F'[,:]' '{print $2}')
                r_count=$(echo "$r_option" | awk -F'[:,]' '{print $4}')
                r_flag=$(echo "$rule" | awk -F' ' '{print $7}')

                echo "r_option : $r_option"
                echo "r_second : $r_second r_count : $r_count"

                if [ "$r_protocol" != "TCP" ]; then
                    syn_detected=false
                    echo "$r_protocol 1"
                fi

                if [ "$r_src_ip" != "any" ]; then
                    if [ "$r_src_ip" != "$sip" ]; then
                        syn_detected=false
                        echo "$r_src_ip 2"
                    fi
                fi

                if [ "$r_src_port" != "any" ]; then
                    if [ "$r_src_port" != "$sport" ]; then
                        syn_detected=false
                        echo "$r_src_port 3"
                    fi
                fi

                if [ "$r_dst_ip" != "any" ]; then
                    if [ "$r_dst_ip" != "$dip" ]; then
                        syn_detected=false
                        echo "$r_dst_ip 4"
                    fi
                fi

                if [ "$r_dst_port" != "any" ]; then
                    if [ "$r_dst_port" != "$dport" ]; then
                        syn_detected=false
                        echo "$r_dst_port 5"
                    fi
                fi

                if [ "$flags" != "$r_flag" ]; then
                    syn_detected=false
                    echo "$flags $r_flag 6"
                fi

                if [ "$syn_detected" = true ]; then
                    ((syn_count+=1))
                    echo "$syn_count 333333"
                fi

                

            done < <(mysql -u $db_user -p"$db_pw" -D $db_name -se "$query")

        fi
	
	fi
done < /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt

if [ $syn_count -ge 20 ]; then
    echo "alert!! SYN count is $syn_count"
fi

