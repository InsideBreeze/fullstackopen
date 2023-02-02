import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAll, updateAnecdote } from "./queries";
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './notificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes",
        anecdotes.map(anecdote =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote));
      notificationDispatch({
        type: "NOTIFY",
        payload: newAnecdote.content
      })

      setTimeout(() => notificationDispatch({
        type: "CLEAR",
      }), 5000);
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      id: anecdote.id,
      newAnecdote: { ...anecdote, votes: anecdote.votes + 1 }
    })
  }

  const result = useQuery("anecdotes", getAll, {
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <p>loading</p>
  }

  if (result.isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
