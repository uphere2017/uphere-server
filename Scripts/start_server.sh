#!/bin/bash
if forever list | grep /var/nodejs/server/server.js > /dev/null
then
    echo "Server is running"
else
    echo "Server has been stopped and it will be started"
    cd /var/nodejs/server
    NODE_ENV=production forever start server.js
fi
