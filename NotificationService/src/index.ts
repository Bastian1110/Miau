// Import the Firebase Admin to interact with FCM
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyparser from "body-parser";
import * as cookieparser from "cookie-parser";
import axios from "axios";
import * as cors from "cors";

import * as AuthService from "./middleware/auth";

// Initialization of Firebase admin with secret 
let serviceAccount = require("../.secret/adminsdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alerta-atizapan-default-rtdb.firebaseio.com"
});

//Database Sevice URI
const databaseService = process.env.DATABASE_SERVICE || "http://localhost:5002";

// Configuration of express server
const app = express();
const port = process.env.PORT || 5003;

app.use(cors({origin : true, credentials: true }));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

// Main stream of notification (all devices)
const topic = "all";

app.get('/test', AuthService.verifyToken, (req, res) => {
    res.status(200).json({message : "Success!"});
});

// Endpoint "addNotification which expects a notification body to be sent to app"
app.post('/addNotification', AuthService.verifyToken, async (req,res) => {
    const notification = req.body.notification;
    const data = req.body.data;
    const message = {notification, topic};
    admin.messaging().send(message)
        .then(async response => {
            let fcm = {status : 200, messageId : response};
            let save = {
                "notification" : {
                    "title" : notification.title,
                    "body" : notification.body,
                    "incident_type" : data.incident_type
                }
            };
            try {
                const token = req.cookies["authCookie"] || req.headers["x-access-token"];
                const response = await axios.post(databaseService + "/notifications", save, {headers : {"x-access-token" : token}});
                if (response.status == 200) {
                    res.status(200).json({fcm, database : {status : 200, message : "Notifications saved"}});
                }
            }
            catch (error) {
                res.status(200).json({fcm, database : {status : 500, message : "Issue saving the notification"}});
            }
        })
        .catch(error => {
            console.log("Error sending message:", error);
            res.status(500).json({message : "Panic!", error}); 
        });
});

// Starting the express server
app.listen(port, () => console.log(`Notification service is listening on http://localhost:${port}/`));