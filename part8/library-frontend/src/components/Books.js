import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_BOOKS_BY_GENRE } from "../queries";

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState("");
  const filteredBooksResult = useQuery(GET_BOOKS_BY_GENRE, {
    variables: {
      genre
    },
    skip: genre === ""
  });
  if (!show) {
    return null;
  }

  if (filteredBooksResult.loading) {
    return <p>loading</p>;
  }
  const getAllGenres = (books) => {
    let genres = [];
    for (let book of books) {
      for (let genre of book.genres) {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      }
    }
    return genres;
  }

  const genres = getAllGenres(books)

  const filteredBooks = genre === "" ? books : filteredBooksResult.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <p>{genre !== "" ? <>in genre <b>{genre}</b></> : ""}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre =>
        <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>)}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
