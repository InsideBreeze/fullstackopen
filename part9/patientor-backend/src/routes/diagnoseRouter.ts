import express from "express";
import { getAllDiagnoses } from "../services/diagnoses";

const diagnoseRouter = express.Router();


diagnoseRouter.get("/", (_req, res) => {
    const diagnoses = getAllDiagnoses();
    res.json(diagnoses);
});


export default diagnoseRouter;
