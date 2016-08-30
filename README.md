# ORCH

`vagrant up`

Enter `./www/default` and run `npm install && npm start`.

To enable a service run:
```
curl -H "Content-Type: application/json" -X POST -d '{"service":"../sample-service/service.js"}' http://10.0.33.34:3000/utility/onboard
```
