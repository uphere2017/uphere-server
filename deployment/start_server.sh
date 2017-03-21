#!/bin/bash

cd ~/node
NODE_ENV=production node server.js > /dev/null 2> /dev/null < /dev/null &
