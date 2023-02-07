import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  // const result = useQuery(GET_ALL_BOOKS);
  const [genre, setGenre] = useState("");
  const filteredBooksResult = useQuery(GET_BOOKS_BY_GENRE, {
    variables: {
      genre
    }
  });
  if (!props.show) {
    return null;
  }

  if (filteredBooksResult.loading) {
    return <p>loading</p>;
  }

  const books = filteredBooksResult.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.genres.map(genre =>
        <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>)}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
