#!/bin/bash
sudo chown -R ec2-user: /srv/node/
cd /srv/node/
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.9.4
sudo npm install
