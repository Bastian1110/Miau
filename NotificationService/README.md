# Notification Service
The is the microservice that interacts with Firebase to send notifications to the app users.

## API Usage
The service will listen on the selected port with th URL _http://HOST:PORT/addMessage_

### Body Paramaters
The API expects a JSON like this : 

```
"notification" : {
	"title" : "<Notification Name>",
    "body": "<Notification description>"
}
```

To know more about the notification paramaters look for [FCM Notification Messages](https://firebase.google.com/docs/cloud-messaging/concept-options)

### Security
This microservice is interconnected with the authentication service, so in order to make requests, you will have to send a token that ensures that the creator of the request is verified.

## Development
It is being developed with Typescript on Node v18. To develop, here is a guide.

> _WARNING : To run succesfully you should have all the microservices running in your machine._

### Starting
Navigate to the notification microservice repository.

`cd YOUR_PATH/incidentes-atizapan/Backend/NotificationService`

Install the dependencies

`npm install`

You must ask for the key that authorizes Firebase services, when you get it rename it as _adminsdk_ and move it to the _.secret_ directory.

`mv incidentes-key.json adminsdk.json`
`mv adminsdk.json incidentes-atizapan/Backend/NotificationService/.secret`

To test your code use the command :

`npm run dev`

That is all!

## Deploying

Please look for the Backend Architecture to learn how it's going to be deployed. We are using Docker conteiners for this purpose.
