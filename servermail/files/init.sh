#!/bin/bash

postconf -e "mynetworks = 127.0.0.0/8 $ALLOWED_NETWORKS"
postconf -e 'mydestination = $myhostname, '"$DOMAIN_NAME"', localhost.localdomain, localhost'

service postfix start
dovecot -c /etc/dovecot/dovecot.conf -F