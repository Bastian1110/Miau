import * as express from "express";
import * as bodyparser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as argon from "argon2";
import * as cookieparser from "cookie-parser";

import User from "./models/User";

import UserRoutes from "./routes/UserRoutes";
import IncidentRoutes from "./routes/IncidentRoutes";
import NotificationRoutes from "./routes/NotificationRoutes";

//Initial configuration of admin user *CHANGE IMMEDIATELY IN PRODUCTION*
const privateData = require("../.secret/private.json");

// Configuration of express server
const app = express();
const port = process.env.PORT || 5002;

app.use(cors({origin : true, credentials: true }));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

// Database connection
const mongoUri = process.env.MONGODB_CONNSTRING || 'mongodb://127.0.0.1:27017/alerta_atizapan';
mongoose.connect(mongoUri);

//Check for the admin user
User.find({username : "admin"}, async (err : any, docs : Array<Object>) => {
    if (!err) {
        if (docs.length == 0) {
            const hashPassword = await argon.hash(privateData.adminpswd);
            let admin = new User({username : "admin", password : hashPassword});
            admin.save();
        }
    }
    else {
        console.log("Error with th database : ", err);    
    }
});

//Add the User Routes
app.use('/users', UserRoutes);
app.use('/incidents', IncidentRoutes);
app.use('/notifications', NotificationRoutes);

// Starting the express server
app.listen(port, () => console.log(`Database service is listening on http://localhost:${port}/`));