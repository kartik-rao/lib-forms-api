#!/bin/bash
if [ $# -gt 0 ]; then
    echo ""
else
    echo "Usage: create-user POOLID EMAIL GROUP"
    exit 1
fi

if [ "$3" != "" ]; then
    echo "create-user: Assigning group $3 to user $2"
    aws cognito-idp admin-add-user-to-group \
    --user-pool-id $1 \
    --username $2 \
    --group-name $3
else
    echo "Usage: create-user POOLID EMAIL GROUP"
fi

echo "Done!!"
exit 0