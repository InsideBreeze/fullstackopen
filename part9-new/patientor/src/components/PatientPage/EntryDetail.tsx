import React from "react";
import { Entry } from "../../types";

const EntryDetail = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <p>healthCheckRating: {entry.healthCheckRating}</p>
        </div>
      );
    case "Hospital":
      return (
        <div>
          <p>
            discharge: {entry.discharge.date}, criteria:
            {entry.discharge.criteria}
          </p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>name: {entry.employerName}</p>
          <p>
            {entry.sickLeave &&
              `${entry.sickLeave.startDate}-${entry.sickLeave.endDate}`}
          </p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error("entry is invalid" + value);
};

export default EntryDetail;
