import { Provider } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter';
import Notification from './components/Notification';
import store from "./store";

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </Provider>
  )
}

export default App
