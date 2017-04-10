#!/bin/bash
if forever list | grep /var/nodejs/server/server.js > /dev/null
then
    echo "Server is running and it will be stopped"
    forever stopall
else
    echo "Server has been stopped"
fi
