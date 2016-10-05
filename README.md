# ORCH

This is just a POC of how to extend an API server with synchornizers that can communicate trough a rabbitMQ pub/sub system.

## Create the environment
Enter this folder and run: `vagrant up` (go grab a coffe, may take a while the first time)

## Run the nodeJs API server
Enter `cd /var/www/core` and run `npm install && npm start`.

## Services

You can find instructions for services in their folders `README`

## Rabbit MQ

Reset the messages queues (connect to the `rabbitmq` container):

```
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
```