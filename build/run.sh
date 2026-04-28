#!/bin/bash

/usr/local/services/tnginx_1_0_0-1.0/bin/nginx -g "daemon off;" -c /usr/local/services/tnginx_1_0_0-1.0/conf/nginx.conf

if [ $? -eq 0 ]
then
    echo "service started"
else
    echo "service start failed" 1>&2
    exit 1
fi
