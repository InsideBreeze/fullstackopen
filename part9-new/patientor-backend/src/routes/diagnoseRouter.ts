import express from "express";
import { getAllDiagnoses } from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
    return res.json(getAllDiagnoses());
});

export default diagnoseRouter;