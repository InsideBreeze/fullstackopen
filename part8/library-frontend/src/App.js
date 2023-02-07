import { useApolloClient, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED, GET_ALL_BOOKS, GET_ME, LOGIN } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set();
    return a.filter(item => {
    //  console.log(item);
      let k = item.title;
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook))
    }
  })
}
const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN);
  const userResult = useQuery(GET_ME, {
    skip: !token
  });
  const booksResult = useQuery(GET_ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      updateCache(client.cache, { query: GET_ALL_BOOKS }, data.data.bookAdded)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("loggedUser", token);
    }
  }, [result.data])

  useEffect(() => {
    const token = localStorage.getItem("loggedUser");
    if (token) {
      setToken(token);
    }
  }, [])



  const handleLogin = (username, password) => {
    login({
      variables: { username, password }
    })
    setPage("authors");
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore() // clear cache
  }

  if (userResult.loading || booksResult.loading) return <p>loading</p>

  const books = booksResult.data.allBooks;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          !token && <button onClick={() => setPage("login")}>login</button>
        }
        {token && <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
        </>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} onLogin={handleLogin} />
      {
        token && <Recommendations show={page === "recommend"} genre={userResult.data.me.favouriteGenre} />
      }
    </div>
  );
};

export default App;
