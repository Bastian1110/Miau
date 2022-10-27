import * as express from "express";
import Incident from "../models/Incident";
import * as AuthService from "../middleware/auth";

const router = express.Router();

//FindAll
router.get('/', (req, res) => {
    Incident.find({},(err : any, docs : Array<Object>) => {
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
    Incident.findById(id, (err : any, docs : Array<Object>) => {
        if (!err) {
            res.send({code : 200, docs});
            return;
        }
        res.send({code : 500, err});
        return;
    });
});

//Create Incident
router.post('/', AuthService.verifyToken, (req , res) => {
    let incident = req.body.incident;
    if (!incident) {
        res.send({code : 403, message : "Incorrect create form"});
        return;
    }
    let newIncidient = new Incident(incident);
    newIncidient.save();
    res.send({code : 200, message : "New incident created"});
});

//Delete Incident
router.delete('/:id', AuthService.verifyToken, (req, res) => {
    let id = req.params.id;
    Incident.findByIdAndRemove(id, (err : any) => {
        if (!err) {
            res.send({code : 200, message : "Incident deleted"});
            return;
        }
        res.send({code : 500, err});
    });
});

export default router;