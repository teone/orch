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

# Add nodejs repo
add-apt-repository -y ppa:chris-lea/node.js
apt-get -y update

# Install nodejs
apt-get install -y nodejs

# Install latest stable version of MongoDB
apt-get install -y mongodb-10gen

# Install Docker
apt-get install -y apt-transport-https ca-certificates
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-precise main" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get purge lxc-docker
apt-cache policy docker-engine
apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
apt-get install -y linux-image-generic-lts-trusty
apt-get install -y docker-engine
service docker start

# install Rabbit MQ
# Add Debian Wheezy backports repository to obtain init-system-helpers
gpg --keyserver pgpkeys.mit.edu --recv-key 7638D0442B90D010
gpg -a --export 7638D0442B90D010 | sudo apt-key add -
echo 'deb http://ftp.debian.org/debian wheezy-backports main' | sudo tee /etc/apt/sources.list.d/wheezy_backports.list

# Add Erlang Solutions repository to obtain esl-erlang
wget -O- https://packages.erlang-solutions.com/debian/erlang_solutions.asc | sudo apt-key add -
echo 'deb https://packages.erlang-solutions.com/debian wheezy contrib' | sudo tee /etc/apt/sources.list.d/esl.list

sudo apt-get update
sudo apt-get install -y init-system-helpers socat esl-erlang

# continue with RabbitMQ installation as explained above
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
echo 'deb http://www.rabbitmq.com/debian/ testing main' | sudo tee /etc/apt/sources.list.d/rabbitmq.list

sudo apt-get update
sudo apt-get install -y rabbitmq-server

# Victory!
echo "You're all done! Your are all set!"
