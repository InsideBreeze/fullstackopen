import express from "express";
import {
  createPatient,
  findPatientById,
  getAllPublicPatients,
} from "../services/patientService";
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

export default patientRouter;
