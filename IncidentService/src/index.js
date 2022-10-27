const axios = require("axios").default;
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const port = process.env.PORT || 5004;
const databaseService = process.env.DATABASE_SERVICE || "http://localhost:5002"; // https://database.safeatizapan.lol

const PROTO_PATH = __dirname + "/incident.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const incidentservice =
  grpc.loadPackageDefinition(packageDefinition).mx.itesm.incidentesatizapan;

async function getIncidentsFromDb(incidentServiceRpcRequest) {
  try {
    let response = await axios.get(databaseService + "/incidents");
    let incidents = response.data.docs;
    return { incident: incidents };
  } catch (err) {
    console.log("Error with the databse service", err);
  }
}

async function getIncidents(call, callback) {
  callback(null, await getIncidentsFromDb(call.request));
}

/**
 * Starts an RPC server that receives requests for the Incident service at the
 * sample server port
 */
function main() {
  let server = new grpc.Server();
  server.addService(incidentservice.IncidentService.service, {
    getIncidents: getIncidents,
  });
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(
        `gRPC server started on port ${port}, with services getIncidents`
      );
      server.start();
    }
  );
}

main();
