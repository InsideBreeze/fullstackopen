import {
  Diagnose,
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  SickLeave,
} from "../types";

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!(typeof object === "object") || !object) {
    throw new Error();
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const description = parseDescription(object);
    const specialist = parseSpecialist(object);
    const diagnosisCodes = parseDiagnosisCodes(object);
    const date = parseDate(object);
    switch (object.type) {
      case "HealthCheck":
        return {
          description,
          specialist,
          diagnosisCodes,
          date,
          healthCheckRating: parseCheckingRating(object),
          type: "HealthCheck",
        };
      case "OccupationalHealthcare":
        return {
          description,
          specialist,
          diagnosisCodes,
          date,
          employerName: parseEmployerName(object),
          sickLeave: parseSickLeave(object),
          type: "OccupationalHealthcare",
        };
      case "Hospital":
        return {
          description,
          specialist,
          diagnosisCodes,
          date,
          discharge: parseDischarge(object),
          type: "Hospital",
        };
    }
  }

  throw new Error("something wrong" + JSON.stringify(object));
};

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const parseDescription = (
  object: object & Record<"description", unknown>
): string => {
  if (!isString(object.description)) {
    throw new Error("invalid description value" + object.description);
  }
  return object.description;
};

const parseSpecialist = (
  object: object & Record<"specialist", unknown>
): string => {
  if (!isString(object.specialist)) {
    throw new Error("invalid value" + object.specialist);
  }
  return object.specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseDate = (object: object & Record<"date", unknown>): string => {
  if (!isString(object.date) || !isDate(object.date)) {
    throw new Error("invalid date value: " + object.date);
  }
  return object.date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((r) => Number(r))
    .includes(rating);
};

const parseCheckingRating = (object: object): HealthCheckRating => {
  if (
    !("healthCheckRating" in object) ||
    !(typeof object.healthCheckRating === "number") ||
    !isCheckRating(object.healthCheckRating)
  ) {
    throw new Error("invalid value" + object);
  }
  return object.healthCheckRating;
};

const parseEmployerName = (object: object): string => {
  if (!("employerName" in object) || !isString(object.employerName)) {
    throw new Error("invalid value" + object);
  }
  return object.employerName;
};

const parseSickLeave = (object: object): SickLeave => {
  if (!("sickLeave" in object)) {
    return {} as SickLeave;
  }
  if (!isSickLeave(object.sickLeave)) {
    throw new Error("invalid value" + object);
  }
  return object.sickLeave;
};
const isSickLeave = (object: unknown): object is SickLeave => {
  return (
    typeof object === "object" &&
    object !== null &&
    "startDate" in object &&
    isString(object.startDate) &&
    "endDate" in object &&
    isString(object.endDate)
  );
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    return {} as Discharge;
  }
  return object.discharge as Discharge;
};
