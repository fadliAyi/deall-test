## Deall Test From https://talent.usedeall.com/

thank you for the opportunity, i can't wait to hear great news from you. to solve this test im using 2 microservices to handle authentication as a login api and CRUD for the user data. for authentication service im using golang as a programming language and second node js using express with mongodb database. the architecture diagram maybe like this

![diagram](https://github.com/fadliAyi/deall-test/blob/main/diagram.jpg?raw=true)

every resource from user service protected from token which only can check from authentication service using http request.

### API DOCUMENTATION
https://documenter.getpostman.com/view/759515/2s93eeRpkg

### Account Testing login
``` 
username: admin
password: admin123
or
username: john doe
password: admin123
 ```

 ### Proof running using kubernetes
 
![proof-1](https://github.com/fadliAyi/deall-test/blob/main/proof-kubernetes.png?raw=true)
![proof-2](https://github.com/fadliAyi/deall-test/blob/main/proof-kubernetes-2.png?raw=true)

### !!! Before run services
so im using mysql in authentication services where it means you must be create a database manually. so after apply yml config for mysql, please create database manually by access mysql pod. 