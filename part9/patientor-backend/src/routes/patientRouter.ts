import express from "express";
import {
  addPatient,
  getAllNonSensitivePatient,
  getAllPatients,
  addEntry,
} from "../services/patients";
import { toNewEntry } from "../utils/toNewEntry";
import { toNewPatient } from "../utils/toNewPatient";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const patients = getAllNonSensitivePatient();
  res.json(patients);
});

patientRouter.post("/", (req, res) => {
  // validate and parse the input from users
  const newPatient = toNewPatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.status(201).json(addedPatient);
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patients = getAllPatients();
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return res.status(404).end();
  }
  return res.json(patient);
});

patientRouter.post("/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body.healthCheckRating === 0);
  const newEntry = toNewEntry(req.body);
  const addedEntry = addEntry(id, newEntry);
  console.log("lala", addedEntry);
  return res.status(201).json(addedEntry);
});

export default patientRouter;
