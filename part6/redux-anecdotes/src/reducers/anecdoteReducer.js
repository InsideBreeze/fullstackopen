import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    update(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export default anecdoteSlice.reducer;

export const {
  createAnecdote,
  setAnecdotes,
  update
} = anecdoteSlice.actions;

export const initialAnecdotes = () => (async dispatch => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
})

export const voteAnecdote = (id) => (async (dispatch, getState) => {
  const anecdoteToUpdate = getState().anecdotes.find(a => a.id === id);
  const updatedAnecdote = await anecdoteService
    .updateAnecdote(id, { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 });
  dispatch(update(updatedAnecdote))
})
