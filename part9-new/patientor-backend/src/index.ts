import express, { json } from "express";
import cors from "cors";
import patientRouter from "./routes/patientRouter";
import diagnoseRouter from "./routes/diagnoseRouter";

const app = express();
app.use(cors());
app.use(json());


app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnoseRouter);
app.get("/api/ping", (_req, res) => {
    return res.send("pong");
});



const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

