#!/usr/bin/env bash

# Get root up in here
sudo su

# Add MongoDB to apt
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

# Update and begin installing some utility tools
apt-get -y update
apt-get install -y python-software-properties
apt-get install -y vim git subversion curl
apt-get install -y memcached build-essential
apt-get install -y jq

# Install nodejs 6
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install latest stable version of MongoDB
apt-get install -y --force-yes mongodb-10gen

# Victory!
echo "You're all done! Your are all set!"
