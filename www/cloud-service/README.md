# Cloud Service


The purpose of this service is to demonstrate how to create tenant based containers from a new microservice by:

- Start a new micro-service in a docker container (a.k.a `synchronizer`)
- Listen for changes in the data model and propagate them to the synchronizer
- Create a container for each tenant and provision it (a similar approach can be used to create VM in openstack)

_In this example each Tenant will specify a message that should be displayed by the apache server in the newly created container_

## Onboard this service:

```
curl -H "Content-Type: application/json" -X POST -d '{"name": "cloud-service", "api":"../cloud-service/cloud-service.js", "synchronizer": "../cloud-service/synchronizer/"}' http://10.0.33.34:3000/utility/onboard
```

## Create a tenant for this service:

Watch the syncronizer logs with: `docker logs -f synchronizer-cloud-service`

```
curl -H "Content-Type: application/json" -X POST -d '{"name": "cloud-service-tenant-1", "attributes": {"q": "cat"}, "service": "cloud-service"}' http://10.0.33.34:3000/core/tenants
```