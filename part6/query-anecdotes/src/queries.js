import axios from "axios";
const url = "http://localhost:3001/anecdotes"

const getAll = () => axios.get(url).then(response => response.data);

const addAnecdote = (newAnecdote) => axios.post(url, newAnecdote).then(response => response.data);

const updateAnecdote = ({ id, newAnecdote }) => axios.put(`${url}/${id}`, newAnecdote).then(response => response.data);

export {
  getAll,
  addAnecdote,
  updateAnecdote
}
