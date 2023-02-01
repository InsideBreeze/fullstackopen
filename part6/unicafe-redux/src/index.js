import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const { good, ok, bad } = store.getState();

  const handleClick = (type) => {
    store.dispatch({ type })
  }

  return (
    <>
      <div>
        <button onClick={() => handleClick("GOOD")}>good</button>
        <button onClick={() => handleClick("OK")}>ok</button>
        <button onClick={() => handleClick("BAD")}>bad</button>
        <button onClick={() => handleClick("ZERO")}>reset stats</button>
      </div>
      good {good} <br />
      ok {ok} <br />
      bad {bad} <br />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
}

renderApp();

store.subscribe(() => renderApp());
