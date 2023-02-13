import {
  Diagnose,
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
} from "../../types";

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  let entry;

  // parse BaseEntry
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    entry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };
  } else {
    throw new Error("missing field");
  }
  if ("diagnosisCodes" in object) {
    entry = {
      ...entry,
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
  }
  let newEntry: EntryWithoutId;

  if (object.type === "HealthCheck" && "healthCheckRating" in object) {
    newEntry = {
      ...entry,
      type: "HealthCheck",
      healthCheckRating: parseRating(object.healthCheckRating),
    };
  } else if (object.type === "Hospital" && "discharge" in object) {
    newEntry = {
      ...entry,
      type: "Hospital",
      discharge: parseDischarge(object.discharge),
    };
  } else if (
    object.type === "OccupationHealthcare" &&
    "employerName" in object
  ) {
    newEntry = {
      ...entry,
      type: "OccupationalHealthcare",
      employerName: parseEmployerName(object.employerName),
    };
    if ("sickLeave" in object) {
      newEntry = {
        ...newEntry,
        sickLeave: parseSickLeave(object.sickLeave),
      };
    }
  } else {
    throw new Error("invalid fileds");
  }
  return newEntry;
};

const parseEmployerName = (name: unknown) => {
  if (!isString(name)) {
    throw new Error("invalid name");
  }
  return name;
};
const parseDischarge = (discharge: unknown) => {
  if (
    !(typeof discharge === "object") ||
    !discharge ||
    !isDischarge(discharge)
  ) {
    throw new Error("invalid filed discharge");
  }
  return discharge;
};

const isDischarge = (discharge: object): discharge is Discharge => {
  return "date" in discharge && "criteria" in discharge;
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  return "startDate" in sickLeave && "endDate" in sickLeave;
};

const parseSickLeave = (sickLeave: unknown) => {
  if (
    !(typeof sickLeave === "object") ||
    !sickLeave ||
    !isSickLeave(sickLeave)
  ) {
    throw new Error("invalid filed sickleave");
  }
  return sickLeave;
};
const parseDescription = (description: unknown) => {
  if (!isString(description)) {
    throw new Error("description is invalid");
  }
  return description;
};

const parseSpecialist = (specialist: unknown) => {
  if (!isString(specialist)) {
    throw new Error("specialist is invalid");
  }
  return specialist;
};

const parseDate = (date: unknown) => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("the date field is invalid");
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseRating = (rating: unknown) => {
  console.log("??", rating);
  if (!isNumber(rating) || !isRating(rating)) {
    throw new Error(`the rating field is invalid: ${rating}`);
  }
  return rating;
};

const isRating = (rating: number): rating is HealthCheckRating => {

  console.log("hhhhh");
  return Object.values(HealthCheckRating)
    .map((r) => Number(r))
    .includes(rating);
};

const parseDiagnosisCodes = (codes: unknown) => {
  if (!(codes instanceof Array) || !isCodeArray(codes)) {
    throw new Error("the codes is invalid");
  }
  return codes;
};

const isCodeArray = (codes: any[]): codes is Array<Diagnose["code"]> => {
  return codes.every((code) => code instanceof Array<Diagnose["code"]>);
};

const isNumber = (rating: unknown): rating is number => {
  console.log("lala", rating);
  return typeof rating === "number" || rating instanceof Number;
};


