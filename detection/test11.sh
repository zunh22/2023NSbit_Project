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
last_reset_time=$SECONDS

function reset_packet_count() {
    echo "Resetting packet count"
    syn_count=0
    last_reset_time=$SECONDS
}

while IFS= read -r line; do
	#protocol is ARP / TCP

    # 일정 시간이 경과하면 즉시 초기화
    #time_difference=$((SECONDS - last_reset_time))
    #echo "di : $time_difference"

    #if ((time_difference >= reset_interval)); then
    #    reset_packet_count
    #fi

	if echo "$line" | grep -q "$protocol"; then
		arp_detected=true

        IFS= read -r line2
        query="SELECT protocol, src_ip, src_port, dst_ip, dst_port, option, flag FROM $rule_table"

        if echo "$line" | grep -q "ARP"; then
            if echo "$line" | grep -q "Reply"; then
                while IFS= read -r rule; do
                    ip=$(echo "$line" | grep -oE 'Reply ([0-9]{1,3}\.){3}[0-9]{1,3}' | awk '{print $2}')
                    mac=$(echo "$line" | grep -oE 'is-at ([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}' | awk '{print $2}')
                    r_src_ip=$(echo "$rule" | awk -F' ' '{print $2}')
                    #arp는 응답 패킷에서만 발생 응답 패킷에서 ip mac 비교하면 됨
                    #출발지 ip에 특정 ip 넣으면 거기서 출발하는 패킷만 보는 rule 설정만 될듯 -> 아직 안함
                    #reply 패킷에 도착지 ip가 나오지 않음 mac만 나옴
                    query2="SELECT mac FROM $whitelist_table WHERE ip='$ip'"
                    packet_mac=$(mysql -u $db_user -p$db_pw -D $db_name -se "$query2")

                    if [ "$r_src_ip" != "any" ]; then
                        if [ "$r_src_ip" != "$ip" ]; then
                            arp_detected=false
                        fi
                    fi

                    if [ "$arp_detected" = true ]; then
                        if [ "$mac" != "$packet_mac" ]; then
                            echo "arp spoofing!!"
                        fi

                    fi



                done < <(mysql -u $db_user -p"$db_pw" -D $db_name -se "$query")
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
                r_second_int=$((r_second))
                r_count_int=$((r_count))

                
                if [ "$r_protocol" != "TCP" ]; then
                    syn_detected=false
      
                fi

                if [ "$r_src_ip" != "any" ]; then
                    if [ "$r_src_ip" != "$sip" ]; then
                        syn_detected=false
                    fi
                fi

                if [ "$r_src_port" != "any" ]; then
                    if [ "$r_src_port" != "$sport" ]; then
                        syn_detected=false
                    fi
                fi

                if [ "$r_dst_ip" != "any" ]; then
                    if [ "$r_dst_ip" != "$dip" ]; then
                        syn_detected=false
                     fi
                fi

                if [ "$r_dst_port" != "any" ]; then
                    if [ "$r_dst_port" != "$dport" ]; then
                        syn_detected=false

                    fi
                fi

                if [ "$flags" != "$r_flag" ]; then
                    syn_detected=false

                fi

                if [ "$syn_detected" = true ]; then
                    ((syn_count+=1))
                    if [ "$syn_count" -le 1 ]; then
                        last_reset_time=$SECONDS
                        echo "set"
                    fi
                    echo "time : $last_reset_time"
                    echo "$syn_count 333333"

                    if [ "$syn_count" -ge "$r_count_int" ]; then
                        echo "alert!! SYN count is $syn_count"
                        echo "SYN Flooding:$line \ $line2" | nc -u localhost 3500
                    fi

                fi

                if [ "$r_option" != "NULL" ]; then
                    # 일정 시간이 경과하면 즉시 초기화
                    time_difference=$((SECONDS - last_reset_time))
                    echo "di : $time_difference"

                    if [ "$time_difference" -ge "$r_second_int" ]; then
                        reset_packet_count
                    fi
                fi
                

            done < <(mysql -u $db_user -p"$db_pw" -D $db_name -se "$query")

        fi
	
	fi
done < /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt


