import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setVisitedPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Transgender } from "@mui/icons-material";
const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ visitedPatients }, dispatch] = useStateValue();

  useEffect(() => {
    if (id && !Object.keys(visitedPatients).includes(id)) {
      axios
        .get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then((response) => {
          dispatch(setVisitedPatient(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  if (!id) {
    return null;
  }

  const patient = visitedPatients[id];
  const gender = patient?.gender.toString();
  return (
    <div>
      <h3>
        {patient?.name}{" "}
        {gender && gender === "male" ? (
          <MaleIcon />
        ) : gender === "female" ? (
          <FemaleIcon />
        ) : (
          <Transgender />
        )}
      </h3>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientPage;
