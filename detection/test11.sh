#!/bin/bash

container_name="$1"

date

timeout 60 docker exec "$container_name" tcpdump -i eth0 -nn -e -tttt -X >> /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt

db_user="root"
db_pw="1234pkj"
db_name="project"
whitelist_table="whitelist"
rule_table="rule"

while IFS= read -r line; do
	syn_detected=false
	arp_detected=false

	protocol=$(mysql -u $db_user -p"$db_pw" -D $db_name -se "SELECT protocol FROM $rule_table")

	

done < /home/say/2023NSbit_Project/packet/tcpdump_$container_name.txt
