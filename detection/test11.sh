#!/bin/bash

container_name="$1"

date

timeout 60 docker exec "$container_name" sudo tcpdump -i eth0 -nn -e -tttt -X >> /home/hyeyeon/detection/tcpdump_$container_name.txt

whitelist_user="root"
whitelist_pw="gpdus0405"
whitelist_db="project"
whitelist_table="whitelist"

rule_user="root"
rule_pw="gpdus0405"
rule_db="project"
rule_table="rule"

while IFS= read -r line; do
	syn_detected=false
	arp_detected=false

	protocol=$(mysql -u $rule_user -p"$rule_pw" -D $rule_db -se "SELECT protocol FROM $rule_table")

done < /home/hyeyeon/detection/tcpdump_$container_name.txt
