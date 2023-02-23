import patients from "../../data/patients";
import { EntryWithoutId, NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

export const getAllPatients = () => {
  return patients;
};

export const getAllPublicPatients = () => {
  return patients.map(({ name, dateOfBirth, id, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const createPatient = (newPatient: NewPatient): Patient => {
  const patient = { ...newPatient, id: uuid() };
  patients.push(patient);
  return patient;
};

export const findPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export const addEntry = (id: string, entry: EntryWithoutId) => {
  const newEntry = { id: uuid(), ...entry };
  const patient = patients.find((p) => p.id === id) as Patient;
  patient.entries.push(newEntry);
  return newEntry;
};
