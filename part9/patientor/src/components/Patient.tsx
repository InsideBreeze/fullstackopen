/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setVisitedPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId, Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Transgender } from "@mui/icons-material";
import EntryDetail from "./EntryDetail";
import AddEntryForm from "./AddEntryForm";
const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ visitedPatients, diagnoses }, dispatch] = useStateValue();
  const [type, setType] = useState("")

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

  const handleSubmit = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}`,
        values
      );
      console.log(newEntry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        //       setError(
        //         String(e?.response?.data?.error) || "Unrecognized axios error"
        //       );
      } else {
        console.error("Unknown error", e);
        //       setError("Unknown error");
      }
    }
  };
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
      <div>
        <h4>entries</h4>
        {patient &&
          patient.entries &&
          diagnoses.length !== 0 &&
          patient.entries.map((entry) => (
            <EntryDetail key={entry.id} entry={entry} />
          ))}
        <AddEntryForm
          onSubmit={handleSubmit}
          onCancel={() => console.log("hmm")}
        />
      </div>
    </div>
  );
};

export default PatientPage;
