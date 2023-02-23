import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";
import {
  BaseEntryFields,
  EntryWithoutId,
  HealthCheckEntryFields,
  HospitalEntryFields,
  OccupationalHealthcareEntryFields,
  Patient,
} from "../types";
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
  const [baseEntryFields, setBaseEntryFields] = React.useState<BaseEntryFields>(
    {
      description: "",
      date: "",
      specialist: "",
      codes: "",
    }
  );
  const [hospitalFields, setHospitalFields] =
    React.useState<HospitalEntryFields>({
      dischargeDate: "",
      criteria: "",
    });

  const [
    occupationalHealthcareEntryFields,
    setOccupationalHealthcareEntryFields,
  ] = React.useState<OccupationalHealthcareEntryFields>({
    employerName: "",
    startDate: "",
    endDate: "",
  });

  const [healthCheckFields, setHealthCheckFields] =
    React.useState<HealthCheckEntryFields>({
      healthCheckRating: "",
    });

  const id = useParams().id;
  const addEntry = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        let basicEntry = {
          description: baseEntryFields.description,
          date: baseEntryFields.date,
          specialist: baseEntryFields.specialist,
          diagnosisCodes: baseEntryFields.codes.split(","),
        };
        let entry: EntryWithoutId;
        if (type === "Hospital") {
          entry = {
            ...basicEntry,
            discharge: {
              date: hospitalFields.dischargeDate,
              criteria: hospitalFields.criteria,
            },
            type: "Hospital",
          };
          const newEntry = await patientService.addEntry(id, entry);
          updatePatient({
            ...patient,
            entries: patient.entries.concat(newEntry),
          });
          setHospitalFields({
            dischargeDate: "",
            criteria: "",
          });
        } else if (type === "OccupationalHealthcare") {
          entry = {
            ...basicEntry,
            type: "OccupationalHealthcare",
            sickLeave: {
              startDate: occupationalHealthcareEntryFields.startDate,
              endDate: occupationalHealthcareEntryFields.endDate,
            },
            employerName: occupationalHealthcareEntryFields.employerName,
          };
          const newEntry = await patientService.addEntry(id, entry);
          updatePatient({
            ...patient,
            entries: patient.entries.concat(newEntry),
          });
          setOccupationalHealthcareEntryFields({
            employerName: "",
            startDate: "",
            endDate: "",
          });
        } else {
          entry = {
            ...basicEntry,
            healthCheckRating: parseInt(healthCheckFields.healthCheckRating),
            type: "HealthCheck",
          };
          const newEntry = await patientService.addEntry(id, entry);
          updatePatient({
            ...patient,
            entries: patient.entries.concat(newEntry),
          });
          setHealthCheckFields({
            healthCheckRating: "",
          });
        }

        setBaseEntryFields({
          description: "",
          date: "",
          specialist: "",
          codes: "",
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
    <form onSubmit={addEntry}>
      <>
        {type === "Hospital" ? (
          <h3>New Hospital Entry</h3>
        ) : type === "OccupationalHealthcare" ? (
          <h3>New OccupationalHealthcare Entry</h3>
        ) : (
          <h3>New Healthcheck Entry</h3>
        )}

        <TextField
          label="description"
          fullWidth
          style={{ margin: "5px" }}
          value={baseEntryFields.description}
          onChange={(e) =>
            setBaseEntryFields({
              ...baseEntryFields,
              description: e.target.value,
            })
          }
        />
        <InputLabel style={{ marginTop: 10 }}>Date</InputLabel>
        <Input
          type="date"
          fullWidth
          style={{ margin: "5px" }}
          value={baseEntryFields.date}
          onChange={(e) =>
            setBaseEntryFields({ ...baseEntryFields, date: e.target.value })
          }
        />
        <TextField
          label="specialist"
          fullWidth
          style={{ margin: "5px" }}
          value={baseEntryFields.specialist}
          onChange={(e) =>
            setBaseEntryFields({
              ...baseEntryFields,
              specialist: e.target.value,
            })
          }
        />
        <TextField
          label="diagnosisCodes"
          fullWidth
          style={{ margin: "5px" }}
          value={baseEntryFields.codes}
          onChange={(e) =>
            setBaseEntryFields({
              ...baseEntryFields,
              codes: e.target.value,
            })
          }
        />
        {type === "Hospital" && (
          <>
            <InputLabel style={{ marginTop: 10 }}>Discharge Date</InputLabel>
            <Input
              type="date"
              fullWidth
              style={{ margin: "5px" }}
              value={hospitalFields.dischargeDate}
              onChange={(e) =>
                setHospitalFields({
                  ...hospitalFields,
                  dischargeDate: e.target.value,
                })
              }
            />
            <TextField
              label="criteria"
              fullWidth
              style={{ margin: "5px" }}
              value={hospitalFields.criteria}
              onChange={(e) =>
                setHospitalFields({
                  ...hospitalFields,
                  criteria: e.target.value,
                })
              }
            />
          </>
        )}
        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="emploerName"
              style={{ margin: "5px" }}
              fullWidth
              value={occupationalHealthcareEntryFields.employerName}
              onChange={(e) =>
                setOccupationalHealthcareEntryFields({
                  ...occupationalHealthcareEntryFields,
                  employerName: e.target.value,
                })
              }
            />
            <InputLabel style={{ marginTop: 10 }}>Start Date</InputLabel>
            <Input
              type="date"
              fullWidth
              style={{ margin: "5px" }}
              value={occupationalHealthcareEntryFields.startDate}
              onChange={(e) =>
                setOccupationalHealthcareEntryFields({
                  ...occupationalHealthcareEntryFields,
                  startDate: e.target.value,
                })
              }
            />
            <InputLabel style={{ marginTop: 10 }}>End Date</InputLabel>
            <Input
              type="date"
              fullWidth
              style={{ margin: "5px" }}
              value={occupationalHealthcareEntryFields.endDate}
              onChange={(e) =>
                setOccupationalHealthcareEntryFields({
                  ...occupationalHealthcareEntryFields,
                  endDate: e.target.value,
                })
              }
            />
          </>
        )}
        {type === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 10 }}>HealthCheckRating</InputLabel>
            <Select
              label="HealthCheckRating"
              style={{ marginTop: "5px" }}
              fullWidth
              value={healthCheckFields.healthCheckRating}
              onChange={(e) =>
                setHealthCheckFields({
                  healthCheckRating: e.target.value,
                })
              }
            >
              {["0", "1", "2", "3"].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))}
            </Select>
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
