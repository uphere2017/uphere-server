#!/bin/bash

yum -y update
curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
yum -y install nodejs

