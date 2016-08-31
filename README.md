# ORCH

This is just a POC of how to extend an API server with synchornizers that can communicate trough a rabbitMQ pub/sub system.

## Create the environment
Enter this folder and run: `vagrant up` (go grab a coffe, may take a while the first time)

## Run the nodeJs API server
Enter `./www/default` and run `npm install && npm start`.

## Enable a service
To enable a service run:
```
curl -H "Content-Type: application/json" -X POST -d '{"name": "sample", "api":"../sample-service/service.js", "synchronizer": "../sample-service/synchronizer/"}' http://10.0.33.34:3000/utility/onboard
```

This will add the `[GET | POST] /service` endpoint, create a new docker container called `ubuntu-test` and run the `sample-service/synchronizer` app in it.

## View the communication

Watch the syncronizer logs with: `docker logs -f ubuntu-test`

To send an event to the syncronizer:
```
curl -H "Content-Type: application/json" -X POST -d '{"msg":"Run Rabbit!"}' http://10.0.33.34:3000/service
```

## NOTES

Get docker container ip: `docker inspect <container> | grep IPAddress`

## Create a Tenant for service