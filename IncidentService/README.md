# Incident Service
This microservice interacts with the Database microservice to retrieve the active incidents in a particular location, and communicates with the app clients, which will show those incidents in the municipality map.

## API Usage
Create the client class using gRPC in Java or Kotlin: [gRPC Documentation](https://grpc.io). In this case, the client class is implemented at the following directory: `Application/app/src/main/java/mx/itesm/incidentesatizapan/IncidentServiceClient.kt`.

Copy the content from the incident.proto file to the `src/main/proto` directory in the Android Application and add the dependencies from Protocol Buffers and gRPC to the Gradle files in the app project.

### Starting the server
Navigate to the incident microservice repository.

`cd YOUR_PATH/incidentes-atizapan/Backend/IncidentService`

Install the dependencies.

`npm install`

Run the server with the following command.

`node index.js`

That's all!