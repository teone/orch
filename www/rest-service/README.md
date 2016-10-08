# Rest Service

The purpose of this service is to demonstrate how to interact with extenal system by:

- Extending the Core API
- Extending Core Models (adding service specific models)
- Start a new micro-service in a docker container (a.k.a `synchronizer`)
- Listen for changes in the data model and propagate them to the synchronizer

_In this example each Tenant will specify a gif category (Thanks Giphy)_

## Onboard this service:

```
curl -H "Content-Type: application/json" -X POST -d '{"name": "rest-service", "api":"../rest-service/rest-service.js", "synchronizer": "../rest-service/synchronizer/"}' http://10.0.33.34:3000/utility/onboard
```


## Create a tenant for this service:

Watch the syncronizer logs with: `docker logs -f synchronizer-rest-service`

```
curl -H "Content-Type: application/json" -X POST -d '{"name": "rest-service-tenant-1", "attributes": {"q": "cat"}, "service": "rest-service"}' http://10.0.33.34:3000/core/tenants
```

## Update a tenant for this service:

```
curl -H "Content-Type: application/json" -X PUT -d '{"attributes": {"q": "dog"}}' http://10.0.33.34:3000/core/tenants/:id
```

## View synchronized gifs by tenant

```
curl http://10.0.33.34:3000/rest-service/gif/rest-service-tenant-1 | jq .
```

or directly in mongo:
```
db.gifs.find({tenantName: 'rest-service-tenant-1'});
```