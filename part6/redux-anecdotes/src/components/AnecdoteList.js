import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";
const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)));
  const dispatch = useDispatch();
  const handleVote = (id) => {
    dispatch(vote(id));
  }
  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} onVote={handleVote} />
      )}
    </>
  )
}

export default AnecdoteList;
