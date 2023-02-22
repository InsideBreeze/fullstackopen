export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type PublicPatient = Omit<Patient, "ssn">;

/* enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
} */