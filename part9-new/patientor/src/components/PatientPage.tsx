import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((patient) => setPatient(patient));
    }
  }, [id]);

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
    </div>
  );
};

export default PatientPage;
