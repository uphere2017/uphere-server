#!/bin/bash
if forever list | grep /var/nodejs/server/server.js > /dev/null
then
    echo "Server is running"
else
    echo "Server has been stopped and it will be started"
    NODE_ENV=production forever start /var/nodejs/server/server.js
fi
