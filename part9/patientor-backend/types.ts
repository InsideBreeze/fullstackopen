export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line
export interface Entry {}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHHER = "other",
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;
