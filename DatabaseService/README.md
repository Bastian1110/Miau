# Database Service
The microservice is in charge of interacting with the mongo database, it simulates the SQL approach using Object Models (schemas).  

## API Usage
The service will listen on the selected port with th URL _http://database-service.HOST/_

### Avilable Endpoints

#### User  
This endpoint is in the URL :  _http://auth-service.HOST/users/_


##### POST (Create User) Body Paramaters 
The API expects a JSON like this : 

```
{
	"username" : "Username",
	"password" : "Password"
}
```

Where _Username_ and _Password_ is the username and password you want to register in the databas, keep in mind that in the future this end point will be auth-protected.

##### Response 
It will send you a response which contains a status code and a message describing the code.

```
{
	"code": 200,
	"message": "Success"
}
```
##### GET (Get all) Body Paramaters 
The API expects a JSON like this : 

`http://host:6969/users/`

##### Response 
It will send you an object containing the status code and (if the request was successfull) a list containing all the User type object in the database

##### GET:username (Get by username) Body Paramaters 
The API expects a request like this : 

`http://host:6969/users/:username`

##### Response 
It will send you an object containing the status code and (if the request was successfull) an object cotaining the info about the requested user. 

#### Incident 
This endpoint is in the URL :  _http://auth-service.HOST/incidents/_


##### POST (Create Incident) Body Paramaters 
The API expects a JSON like this : 

```
{
	"incident" : {
		"coordinate": {
				"latitude": The latitude,
				"longitude": The longitud
			},
			"reference_location": "Address where the incident took place",
			"description": "Description of the incident",
			"incident_type": "INCIDENT TYPE",
			"risk_radius": Risk radius of the incident
	}
}
```

Remember that the attributes _latitude longitude riskradius_ are doubles.

##### Response 
It will send you a response which contains a status code and a message describing the code.

```
{
	"code": 200,
	"message": "Success"
}
```
##### GET (Get all) Body Paramaters 
The API expects a JSON like this : 

`http://host:6969/incidents/`

##### Response 
It will send you an object containing the status code and (if the request was successfull) a list containing all the Incidents type object in the database

##### GET:username (Get by id) Body Paramaters 
The API expects a request like this : 

`http://host:6969/incidents/:id`

##### Response 
It will send you an object containing the status code and (if the request was successfull) an object containing the info about the requested incident. 

#### Notification 
This endpoint is in the URL :  _http://auth-service.HOST/notifications/_


##### POST (Create Notification) Body Paramaters 
The API expects a JSON like this : 

```
{
	"notification" : {
		"title" : "Title of the notification",
		"body" : "Description of the notification",
		"datetime" : "The exact time when the notification was sent"
}
```

##### Response 
It will send you a response which contains a status code and a message describing the code.

```
{
	"code": 200,
	"message": "Success"
}
```
##### GET (Get all) Body Paramaters 
The API expects a JSON like this : 

`http://host:6969/notifications/`

##### Response 
It will send you an object containing the status code and (if the request was successfull) a list containing all the Notifications type object in the database

##### GET:username (Get by id) Body Paramaters 
The API expects a request like this : 

`http://host:6969/Notifications/:id`

##### Response 
It will send you an object containing the status code and (if the request was successfull) an object cotaining the info about the requested incident. 


## Development
It is being developed with Typescript on Node v18. To develop, here is a guide.

> _WARNING : To run succesfully you should have all the microservices running in your machine._

### Starting
Navigate to the notification microservice repository.

`cd YOUR_PATH/incidentes-atizapan/Backend/AuthService`

Install the dependencies

`npm install`

You will have to install a MongoDB server running in the port 27017, we are using the community edition, which you can insttal with this [guide](https://www.mongodb.com/try/download/community2)

To test your code use the command :

`npm run dev`

That is all!

## Deploying

Please look for the Backend Architecture to learn how it's going to be deployed. We are using Docker conteiners for this purpose.
