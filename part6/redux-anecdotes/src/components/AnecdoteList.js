import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, setAnecdotes, initialAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Anecdote from "./Anecdote";
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const anecdotes = [...state.anecdotes];
    return anecdotes.sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch();
  const handleVote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted '${content}'`, 5000));
  }

  // fetch the anecdotes
  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [dispatch])

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} onVote={handleVote} />
      )}
    </>
  )
}

export default AnecdoteList;
