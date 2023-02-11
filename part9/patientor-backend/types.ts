export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}


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
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    sickLeave?: SickLeave
}
interface Discharge {
    date: string;
    criteria: string
}

interface SickLeave {
    startDate: string;
    endDate: string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;