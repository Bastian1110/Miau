import * as express from "express";
import * as argon from "argon2";
import * as AuthService from "../middleware/auth";
import User from "../models/User";

// User table request methods (Create, Find, FindByX)
const router = express.Router();

// FindAll Endpoint
router.get('/', AuthService.verifyToken, (req, res) => {
    User.find({},(err : any, docs : Array<Object>) => {
        if (!err) {
            res.send({code : 200, docs});
            return;
        }
        res.send({code : 500, err});
        return;
    });
});

// FindByUsername Endpoint
router.get('/:username', AuthService.verifyToken, (req, res) => {
    const username = req.params.username;
    if (!username) {
        res.send({code : 401, message : "No username provided"});
        return;
    }
    User.find({username}, (err : any, docs : Array<Object>) => {
        if (!err) {
            res.send({code : 200, docs});
            return;
        }
        res.send({code : 500, err});
    });
});

// Create User Endpoint
router.post('/', AuthService.verifyToken, async (req, res) => {
    let credentials = req.body.credentials;
    if (!credentials) {
        res.send({code : 403, message : "Incorrect create form"});
        return;
    }
    let username = credentials.username as string;
    User.find({username}, async (err : any, docs : Array<Object>) => {
        if (!err) {
            if(docs.length <= 0){
                const hashPassword = await argon.hash(credentials.password);
                const newUser = new User({username : credentials.username, password : hashPassword});
                newUser.save();
                res.send({code : 200, message : "User created"})
                return;
            }
            res.send({code : 401, message : "User already exists"})
            return;
        }
        res.send({code : 500, err});
        return;
    });
});

//Delete User Endpoint
router.delete('/:username', AuthService.verifyToken, (req, res) => {
    const username = req.params.username;
    User.remove({username}, (err : any) => {
        if (!err) {
            res.send({code : 200, message : "User deleted"});
            return;
        }
        res.send({code : "500", err})

    });
});

export default router;