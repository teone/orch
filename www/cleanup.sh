#!/bin/bash

# Clean containers
CONTAINERS=$(docker ps -a --format '{{.Names}}' | grep -v rabbitmq)
docker rm -f $CONTAINERS

# Clear tenants and services 
mongo xos --eval "db.services.remove()"
mongo xos --eval "db.tenants.remove()"