import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./calculateExercises";


const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!").end();
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400)
            .json({ error: "malformatted parameters" });
    }
    const bmi = calculateBmi(height, weight);
    return res.json({
        weight,
        height,
        bmi
    });
});


app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!(daily_exercises && target)) {
        res.status(400).json({ error: "parameters missing" });
    }
    if (typeof target !== "number" || !(daily_exercises instanceof Array)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    for (const exercise of daily_exercises) {
        if (typeof exercise !== "number") {
            return res.status(400).json({ error: "malformatted parameters" });
        }
    }
    return res.json(
        calculateExercises(daily_exercises as number[], target)
    );
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
