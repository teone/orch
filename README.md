# ORCH

`vagrant up`

Enter `./www/default` and run `npm install && npm start`.

To enable a service run:
```
curl -H "Content-Type: application/json" -X POST -d '{"service":"../sample-service/service.js", "synchronizer": "../sample-service/synchronizer/"}' http://10.0.33.34:3000/utility/onboard
```

_then it `Ctrl+c` (WIP)_

To send an event to the syncronizer:
```
curl -H "Content-Type: application/json" -X POST -d '{"msg":"Run Rabbit!"}' http://10.0.33.34:3000/service
```