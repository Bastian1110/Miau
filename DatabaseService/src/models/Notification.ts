import {Schema, model} from "mongoose";
import * as moment from "moment";

const createdAt = function(){
    let d = new Date(new Date().toLocaleString("en-US", {timeZone: 'America/Mexico_City'}));
    var formattedDate = moment(d).format("DD-MM-YYYY:HH:mm:ss");
    return formattedDate;
};
// Model of the Notification "Table"
const NotificationSchema = new Schema({
    title : String,
    body : String,
    incident_type : String,
    timestamp : {
        type : String,
        default : createdAt
    }
});

const Notification = model('Notification', NotificationSchema);
export default Notification;