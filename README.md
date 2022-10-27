# Backend
This is where all the code that qualifies as the Backend of the project is housed.

## Technology We Use For Now
- Express 
- Axios
- Mongoose
- Docker
- Firebase FCM

## Micro-services 
We are aiming to make the backend modularized into microservices, which are represented by a Docker container. All the microservices will be "united" in a Docker Compose that exposes and organizes each one of them.

### Microservices Available
- Notification Service
- Authentication Service
- Databse Service 
- Incident Service

### Deploying
> _WARNING : To run succesfully you should have all the microservices running in your machine._

Each one of the microservices can be compressed in a docker image using the dockerfile, this repository is provided with a docker compose file thaht will handle all the images for you (and even the database!).

> Important : If you want to use docker compose, you will have to set the credentials for the Mongo Container in a _.env_ file, or you can simply cutt off those lines in _docker-compose-yml_. 

If you want to compile a separate image : 

`docker build -t SERVICE_NAME:VERSION .`

If you want to run all the containers at once (recommended) :

```
cd PATH/incidentes-atizapan/Backend
docker-compose up
```
