import { Entry, Gender, NewPatient } from "../types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    return {
      name: parseStringField(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation),
      entries: object.entries as Entry[],
    };
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseStringField = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("error: " + value);
  }
  return value;
};

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const parseGender = (value: unknown) => {
  if (!value || !isString(value) || !isGender(value)) {
    throw new Error("error: " + value);
  }
  return value;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(value);
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const parseDate = (value: unknown) => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error("error: " + value);
  }
  return value;
};
