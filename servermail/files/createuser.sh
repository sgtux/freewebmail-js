#!/bin/bash

if [ "$1" = "" ] || [ "$2" = "" ]; then
    echo "Invalid parameters"
    echo "Ex.: {username} {password}"
    exit
fi

useradd -m -s /bin/bash -p $(openssl passwd -1 $1) $2

echo "User created!"