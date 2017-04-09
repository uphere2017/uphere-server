#!/bin/bash
source /home/ec2-user/.bash_profile
rm -rf /server
# rm -rf ~/.nvm

yum -y update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.9.4

# yum -y install nodejs npm --enablerepo=epel

# cd ~
# curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
# yum -y install nodejs npm
