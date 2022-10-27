var PROTO_PATH = __dirname + "/incident.proto";

var parseArgs = require("minimist");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var incidentservice =
  grpc.loadPackageDefinition(packageDefinition).mx.itesm.incidentesatizapan;

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "137.184.189.169:8003";
  }
  var client = new incidentservice.IncidentService(
    target,
    grpc.credentials.createInsecure()
  );
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = "world";
  }
  client.getIncidents({ name: user }, function (err, response) {
    console.log("Success, ", err, response);
  });
}

main();
