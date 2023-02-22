import patients from "../../data/patients";


export const getAllPatients = () => {
    return patients;
}

export const getAllPublicPatients = () => {
    return patients.map(({ name, dateOfBirth, id, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}