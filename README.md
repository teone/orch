# ORCH

Enter `./default` and run `npm install && npm start`.

To dinamically enable a service use:
```
curl -H "Content-Type: application/json" -X POST -d '{"service":"../sample-service/service.js"}' http://10.0.33.34:3000/utility/onboard
```
