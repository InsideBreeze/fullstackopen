import patients from "../../data/patients";
import { NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";


export const getAllPatients = () => {
    return patients;
}

export const getAllPublicPatients = () => {
    return patients.map(({ name, dateOfBirth, id, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export const createPatient = (newPatient: NewPatient): Patient => {
    const patient = {...newPatient, id: uuid()};
    patients.push(patient);
    return patient;
}