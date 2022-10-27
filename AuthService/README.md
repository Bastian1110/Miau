# Authentication Service
The microservice is in charge of verifying and assigning tokens, in order to ensure that the requests received by all the APIs are secure.

## API Usage
The service will listen on the selected port with th URL _http://auth-service.HOST/_

### Avilable Endpoints

#### Get Token 
This endpoint is in the URL :  _http://auth-service.HOST/getToken_

##### Body Paramaters 
The API expects a JSON like this : 

```
{
	"credentials" : {
		"username" : "Username",
		"password" : "Password"
	}
}
```

Where _Username_ and _Password_ is the username and password registered in the _Users_ collection in the data base

##### Response 
It will send you a response which contains a status code, a message describing the code and last and most importantly (if the request is successful) a cookie with your authtoken, if you are using a web client, it will automatically send the auth-cookie for you.

```
{
	"message": "Success",
	"token": "Token"
}
```

#### Verify 
This endpoint is in the URL :  _http://auth-service.HOST/verify_

##### Headers 
The API expects the request to have a header like this : 

```
    x-access-token : "The token you want to verify" 

	# or

	authCookie : "The token you want to verify" 
```

##### Response 
It will send you a response which contains a status code, a message describing the code and finally (if the request is successful) an object which contains the content of the token already decoded and verified.

```
{
	"message": "Authorized",
	"decoded": Object
}
```

## Development
It is being developed with Typescript on Node v18. To develop, here is a guide.

> _WARNING : To run succesfully you should have all the microservices running in your machine._

### Starting
Navigate to the authentication microservice repository.

`cd YOUR_PATH/incidentes-atizapan/Backend/AuthService`

Install the dependencies

`npm install`

You will have to designate the private key for the service, to set it create a document called _private.json_ that contains the key you want to use. 

private.json

```
{
    "secret" : "eJ+6(I^qFYlo'*jWR3GQAvs-S`k*%Y&E" 
}
```

When you have the key move it to the _.secret_ directory, if it does not exist create it in the path : 

`mkdir AuthService/.secret`

To test your code use the command :

`npm run dev`

That is all!

## Deploying

Please look for the Backend Architecture to learn how it's going to be deployed. We are using Docker conteiners for this purpose.
