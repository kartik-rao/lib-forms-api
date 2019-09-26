#!/bin/bash
if [ $# -gt 0 ]; then
    echo ""
else
    echo "Usage: create-user POOLID ENV EMAIL PASSWORD"
    exit 1
fi

echo "create-user: Adding user $2 to pool $1"
aws cognito-idp admin-create-user \
    --user-pool-id $1 \
    --username $3 \
    --temporary-password $4 \
    --user-attributes Name="email_verified",Value="True" Name=email,Value=$3 \
      Name="custom:environment",Value=$2

echo "Done!!"
exit 0