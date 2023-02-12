import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { LocalHospital } from "@mui/icons-material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const entryStyle = {
    border: "1px solid black",
    marginBottom: "10px"
};

const EntryDetail = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetail entry={entry} />;
    default:
      return assertNever(entry);
  }
};


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled entry typer: ${JSON.stringify(value)}`
    );
  };

const OccupationalHealthcareEntryDetail = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div style={entryStyle}>
      <p>
        {entry.date} <MonitorHeartIcon />
      </p>
      <i>{entry.description}</i>
      <p>{entry.employerName}</p>
      <p>
        {entry.sickLeave && (
          <p>
            from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </p>
        )}
      </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
const HospitalEntryDetail = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={entryStyle}>
      <p>
        {entry.date} <LocalHospital />
      </p>
      <i>{entry.description}</i>
      <p>discharge when: {entry.discharge.date}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
const HealthCheckEntryDetail = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={entryStyle}>
      <p>
        {entry.date} <HealthAndSafetyIcon />
      </p>
      <i>{entry.description}</i>
      <p>health rating: {entry.healthCheckRating}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default EntryDetail;
