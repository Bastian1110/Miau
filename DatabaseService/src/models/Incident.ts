import {Schema, model} from "mongoose";
import * as moment from "moment";

const createdAt = function(){
    let d = new Date(new Date().toLocaleString("en-US", {timeZone: 'America/Mexico_City'}));
    var formattedDate = moment(d).format("DD-MM-YYYY:HH:mm:ss");
    return formattedDate;
};

// Model of the Incident "Table"
const IncidentSchema = new Schema({
    coordinate : Object,
    reference_location: String,
    description: String,
    incident_type: String,
    risk_radius: Number,
    timestamp : {
        type : String,
        default : createdAt
    }
});

const Incident = model('Incident', IncidentSchema);
export default Incident;