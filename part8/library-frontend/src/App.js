import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { GET_ALL_BOOKS, GET_BOOKS_BY_GENRE, GET_ME, LOGIN } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const [login, result] = useMutation(LOGIN);
  const [filter, setFilter] = useState("");


  const userResult = useQuery(GET_ME, {
    skip: !token
  });
  // const booksResult = useQuery(GET_ALL_BOOKS, {
  //   skip: filter.length !== 0
  // })

  const booksResult = useQuery(GET_ALL_BOOKS)


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
  // console.log(booksResult.data.allBooks)

  const getAllGenres = (books) => {
    let genres = [];
    for (let book of books) {
      for (let genre of book.genres) {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      }
    }
    return genres
  }
  const genres = getAllGenres(booksResult.data.allBooks)

  console.log("genre", userResult)
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

      <Books show={page === "books"} genres={genres} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} onLogin={handleLogin} />
      {
        token && <Recommendations show={page === "recommend"} genre={userResult.data.me.favouriteGenre} />
      }
    </div>
  );
};

export default App;
