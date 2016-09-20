# Basic Service

This service will just be an example of:
- Extending the Core APIs
- Start a new micro-service in a docker container (a.k.a `synchronizer`)
- Communicate from the extended APIs to the synchronizer

## Onboard this service:

```
curl -H "Content-Type: application/json" -X POST -d '{"name": "basic-service", "api":"../basic-service/basic-service.js", "synchronizer": "../basic-service/synchronizer/"}' http://10.0.33.34:3000/utility/onboard
```

## Created Endpoints:

### `[POST] /basic-service/send` 

```
curl -H "Content-Type: application/json" -X POST -d '{"msg":"Run Rabbit!"}' http://10.0.33.34:3000/basic-service/send
```

## Check the communication:

Watch the syncronizer logs with: `docker logs -f synchronizer-basic-service`

To send an event to the syncronizer:
```
curl -H "Content-Type: application/json" -X POST -d '{"msg":"Run Rabbit!"}' http://10.0.33.34:3000/basic-service/send
```