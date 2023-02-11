import { Gender, NewPatient } from "../../types";

// valid and parse input from user
export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("name" in object && "dateOfBirth" in object && "ssn" in object
        && "gender" in object && "occupation" in object) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        }
    }
    throw new Error("Incorrect data: some fields are missing");
}

const parseName = (name: unknown) => {
    if (!isString(name)) {
        throw new Error("the name field is invalid");
    }
    return name
}

const parseOccupation = (occupation: unknown) => {
    if (!isString(occupation)) {
        throw new Error("the value of field occupation is invalid")
    }
    return occupation
}
const parseSsn = (ssn: unknown) => {
    if (!isString(ssn)) {
        throw new Error("the ssn field is invalid");
    }
    return ssn;
}

const parseGender = (gender: unknown) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error(`the gender field is invalid ${gender}`);
    }
    return gender;
}

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(gender => gender.toString())
        .includes(gender);
}

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String
}


const parseDate = (date: unknown) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("the date field is invalid");
    }
    return date
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
