import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const addPerson = (newBook) => {
  const response = axios.post(baseUrl, newBook);
  return response.then((result) => result.data);
};

const getPhoneBooks = () => {
  const response = axios.get(baseUrl);
  return response.then((result) => result.data);
};

const updatePerson = (id, newPerson) => {
  const response = axios.put(`${baseUrl}/${id}`, newPerson);
  return response.then((result) => result.data);
};

const deltePerson = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((result) => result.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPhoneBooks,
  addPerson,
  deltePerson,
  updatePerson,
};
