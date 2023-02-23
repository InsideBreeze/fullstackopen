import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import diagnosisService from "../services/diagnoses";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | null>(null);
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
      <h4>entries</h4>
      <div>
        {patient?.entries &&
          patient?.entries.map((entry) => {
            return (
              <div key={entry.id}>
                <p>
                  {entry.date} {entry.description}
                </p>
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
      </div>
    </div>
  );
};

export default PatientPage;
