import express from "express";
import {
  addEntry,
  createPatient,
  findPatientById,
  getAllPublicPatients,
} from "../services/patientService";
import { toNewEntry } from "../utils/toNewEntry";
import { toNewPatient } from "../utils/toNewPatient";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const patients = getAllPublicPatients();
  return res.json(patients);
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatint = toNewPatient(req.body);
    const createdPatient = createPatient(newPatint);
    return res.status(201).json(createdPatient);
  } catch (error) {
    return res.status(400).json({ error: "provided data is invalid" });
  }
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = findPatientById(id);
  if (patient) {
    return res.json(patient);
  }
  return res.status(400).json({ error: "invalid id" });
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const id = req.params.id;
    const entry = addEntry(id, newEntry);
    return res.status(201).json(entry);
  } catch (error) {
    let message = "something bad happened";
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
    return res.status(400).send(message).end();
  }
});

export default patientRouter;
