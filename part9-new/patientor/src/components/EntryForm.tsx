import { Button, Grid, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { EntryWithoutId, Patient } from "../types";
import patientService from "../services/patients";
import { isAxiosError } from "axios";

const EntryForm = ({
  type,
  updatePatient,
  patient,
  notify,
}: {
  type: string;
  patient: Patient;
  updatePatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  notify: (message: string) => void;
}) => {
  const [description, setDescription] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [specialist, setSpecialist] = React.useState<string>("");
  const [codes, setCodes] = React.useState<string>("");
  const [dischargeDate, setDischargeDate] = React.useState<string>("");
  const [criteria, setCriteria] = React.useState<string>("");

  const id = useParams().id;
  const addEntry = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        const newEntry = await patientService.addEntry(id, {
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria,
          },
          type: "Hospital",
          diagnosisCodes: codes.split(","),
        });
        setDescription("");
        setDate("");
        setSpecialist("");
        setCodes("");
        setDischargeDate("");
        setCriteria("");
        updatePatient({
          ...patient,
          entries: patient.entries.concat(newEntry),
        });
      } catch (error) {
        if (isAxiosError(error)) {
          notify(error.response?.data);
        }
        console.log(error);
      }
    }
  };

  return (
    <form
      style={{ border: "1px solid black", padding: "50px" }}
      onSubmit={addEntry}
    >
      <>
        <h3>New Hospital Entry</h3>
        <TextField
          label="description"
          fullWidth
          style={{ margin: "5px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="date"
          fullWidth
          style={{ margin: "5px" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          style={{ margin: "5px" }}
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          label="diagnosisCodes"
          fullWidth
          style={{ margin: "5px" }}
          value={codes}
          onChange={(e) => setCodes(e.target.value)}
        />
        {type === "Hospital" && (
          <>
            <TextField
              label="dischargeCharge"
              fullWidth
              style={{ margin: "5px" }}
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              label="endDate"
              fullWidth
              style={{ margin: "5px" }}
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
            />
          </>
        )}
      </>

      <Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryForm;
