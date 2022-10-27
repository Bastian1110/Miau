import * as express from "express";
import * as AuthService from "../middleware/auth";
import Notification from "../models/Notification";

// Notification table request methods (Create, Find, FindByX)
const router = express.Router();

//FindAll 
router.get('/', (req, res) => {
    Notification.find({},(err : any, docs : Array<Object>) => {
        if (!err) {
            res.send({code : 200, docs});
            return;
        }
        res.send({code : 500, err});
        return;
    });
});

//FindById 
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Notification.findById(id, (err : any, docs : Array<Object>) => {
        if (!err) {
            res.send({code : 200, docs});
            return;
        }
        res.send({code : 500, err});
        return;
    });
});

//Create Notification
router.post('/', AuthService.verifyToken, (req , res) => {
    let notification = req.body.notification;
    if (!notification) {
        res.send({code : 403, message : "Incorrect create form"});
        return;
    }
    let newNotification = new Notification(notification);
    newNotification.save();
    res.send({code : 200, message : "New notification created"});
});

export default router;