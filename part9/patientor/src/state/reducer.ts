import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
| {
  type: "SET_DIAGNOSES",
  payload: Diagnosis[]
}
| {
  type: "ADD_VISITED_PATIENT";
  payload: Patient;
}
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };


export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};

export const setVisitedPatient = (patient: Patient): Action => {
  return {
    type: "ADD_VISITED_PATIENT",
    payload: patient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        // an array to a map
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_VISITED_PATIENT":
      return {
        ...state,
        visitedPatients: {
          ...state.visitedPatients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES": {
      return {
        ...state,
        diagnoses: action.payload
      };
    }
    default:
      return state;
  }
};
