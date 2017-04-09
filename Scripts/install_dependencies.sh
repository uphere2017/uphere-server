#!/bin/bash
sudo rm -rf /var/nodejs/server

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install forever -g

cd /var/nodejs/server
npm install
