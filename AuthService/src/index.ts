import * as jwt from "jsonwebtoken";
import * as argon from "argon2";
import * as express from "express";
import * as bodyparser from "body-parser";
import * as cors from "cors";
import * as cookieparser from "cookie-parser";
import axios from "axios";

//Secret for encoding the JWT (Json Web Token)
const privateData = require("../.secret/private.json");

//Database service uri
const databaseService = process.env.DATABASE_SERVICE || "http://localhost:5002";

//Configuration of express server
const app = express();
const port = process.env.PORT || 5001;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

//Generate the token for the Auth service
let serviceToken = jwt.sign({id : "AUTHSERVICE", username : "AUTHSERVICE"}, privateData.secret);

// Endpoint for getting JWT (Json Web Token)
app.post('/getToken', async (req ,res) => {
    let credentials = req.body.credentials;
    axios.get(databaseService + "/users/" + credentials.username, {headers : {"x-access-token" : serviceToken}})
        .then(async resp => {
            if (resp.data.docs.length > 0) {
                let userData = resp.data.docs[0];
                if (await argon.verify(userData.password, credentials.password)) {
                    let token = jwt.sign(
                        {id : userData._id, username : userData.username},
                        privateData.secret
                    );
                    res.cookie("authCookie", token, { httpOnly: true, secure: false });
                    res.status(200).json({message : "Success", token});
                    return;
                }
                res.status(401).json({message : "Wrong credentials"});
                return;
            }
            else {
                res.status(401).json({message : "Wrong credentials"});
            }
        })
        .catch(err => {
            res.status(500).send({message : "Error with the databse service", err})
            return;
        });
});

// Endpoint for verifying JWT 
app.get('/verify', async (req,res) => {
    let token = req.headers["x-access-token"] || req.cookies["authCookie"];
    if (!token) {
        res.status(400).json({message : "No auth-token provided"});
        return;
    }
    else {
        jwt.verify(token, privateData.secret,(err : any, decoded : any) => {
            if (err) {
                res.status(401).json({message : "Unauthorized"});
                return;
            }
            res.status(200).json({message : "Authorized", decoded});
            return;
        });
    }
});

// Starting the express server
app.listen(port, () => console.log(`Authentication service is listening on http://localhost:${port}/`));