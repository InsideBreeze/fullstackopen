import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../types";
import patientService from "../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import diagnosisService from "../services/diagnoses";
import EntryDetail from "./EntryDetail";
import EntryForm from "./EntryForm";
import ErrorNotification from "./ErrorNotification";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
  const [formType, setFormType] = React.useState<string>("Hospital");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((patient) => setPatient(patient));
    }
  }, [id]);

  // fetch diagnoses
  useEffect(() => {
    diagnosisService.getAll().then((diagnoses) => setDiagnoses(diagnoses));
  }, []);

  const gender = patient?.gender;

  const entryStyle = {
    border: "1px solid black",
    paddingLeft: "10px",
    marginBottom: "2px",
  };

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return (
    <div>
      <h2>
        {patient?.name}{" "}
        {gender === "female" ? (
          <FemaleIcon />
        ) : gender === "male" ? (
          <MaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      <p>{patient?.ssn && `ssn: ${patient.ssn}`}</p>
      <p>{patient?.occupation && `occupation: ${patient.occupation}`}</p>
      <ErrorNotification message={errorMessage} />
      <h4>entries</h4>
      <div>
        {patient?.entries &&
          patient?.entries.map((entry) => {
            return (
              <div key={entry.id} style={entryStyle}>
                <p>
                  {entry.date} {entry.type}
                </p>
                <p>{entry.description}</p>
                <p>diagnose by {entry.specialist}</p>
                {<EntryDetail entry={entry} />}
                <ul>
                  {entry?.diagnosisCodes &&
                    diagnoses &&
                    entry?.diagnosisCodes.map((code) => (
                      <li key={code}>
                        {code}{" "}
                        {
                          diagnoses.find((diagnose) => diagnose.code === code)
                            ?.name
                        }
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        {patient && (
          <EntryForm
            type={formType}
            patient={patient}
            updatePatient={setPatient}
            notify={notify}
          />
        )}
      </div>
    </div>
  );
};

export default PatientPage;
