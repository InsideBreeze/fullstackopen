import express from "express";
import { addPatient, getAllNonSensitivePatient, getAllPatients } from "../services/patients";
import { toNewPatient } from "../utils/toNewPatient";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    const patients = getAllNonSensitivePatient();
    res.json(patients);
})

patientRouter.post("/", (req, res) => {
    // validate and parse the input from users
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.status(201).json(addedPatient)
})

patientRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const patients = getAllPatients();
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        return res.status(404).end();
    }
    return res.json(patient);
})


export default patientRouter;
