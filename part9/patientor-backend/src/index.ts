import express from "express";
import diagnoseRouter from "./routes/diagnoseRouter";
import patientRouter from "./routes/patientRouter";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
    return res.send("pong").end();
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
