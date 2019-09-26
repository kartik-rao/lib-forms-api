#!/bin/bash
if [ $# -gt 0 ]; then
    echo ""
else
    echo "Usage: create-user POOLID USER ENV"
    exit 1
fi

aws cognito-idp  admin-update-user-attributes \
--user-pool-id $1 \
--username $2 \
--user-attributes Name="custom:environment",Value=$3