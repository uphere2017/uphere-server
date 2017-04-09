#!/bin/bash
if NODE_ENV=production forever list | grep /var/nodejs/server/server.js > /dev/null
then
    echo "Server is running and it will be stopped"
    forever stop /var/nodejs/server/server.js
else
    echo "Server has been stopped"
fi
