import { NonSensitivePatient, Patient, NewPatient } from "../../types";
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

export const getAllPatients = (): Patient[] => {
    return patients;
}

export const getAllNonSensitivePatient = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export const addPatient = (newPatient: NewPatient): Patient => {
    const patient = { id: uuid(), ...newPatient };
    patients.push(patient);
    return patient;
}
