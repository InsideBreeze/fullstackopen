import express from "express";
import { addPatient, getAllNonSensitivePatient } from "../services/patients";
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


export default patientRouter;
