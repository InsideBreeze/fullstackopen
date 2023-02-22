import express from "express";
import { getAllPublicPatients } from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    const patients = getAllPublicPatients();
    return res.json(patients);
});

export default patientRouter;