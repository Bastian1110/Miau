import axios from "axios";
import { NextFunction, Request, Response } from "express";

// Auth-service URI for authenticating tokens
const authService = process.env.AUTH_SERVICE || "http://localhost:5001";

// Middlewarte for checking tokens
const verifyToken = async (req : Request, res : Response, next : NextFunction) => {
    const token = req.cookies["authCookie"] || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({message : "A token is required for this action"})
    }
    const response : any = await axios.get(authService + "/verify", {headers : {"x-access-token" : token as string}})
        .catch(err => {
            console.log(err);
        });

    if (response.status !== 200) {
        return res.status(403).json({message : "Not authorized for the notification service"})
    }
    return next();
};

export {verifyToken};