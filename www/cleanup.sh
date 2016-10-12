#!/bin/bash

# Clean containers
CONTAINERS=$(docker ps -a --format '{{.Names}}' | grep -v rabbitmq)
docker rm -f $CONTAINERS

# Clear tenants and services 
mongo xos --eval "db.services.remove()"
mongo xos --eval "db.tenants.remove()"
mongo xos --eval "db.gifs.remove()"

## Cleanup rabbitMq
docker exec rabbitmq rabbitmqctl stop_app
docker exec rabbitmq rabbitmqctl reset
docker exec rabbitmq rabbitmqctl start_app