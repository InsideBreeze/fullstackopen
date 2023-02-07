import { useQuery } from "@apollo/client"
import { GET_BOOKS_BY_GENRE } from "../queries"

const Recommendations = ({ show, genre }) => {

  const booksResult = useQuery(GET_BOOKS_BY_GENRE, {
    variables: {
      genre: genre
    }
  })

  console.log(genre);

  if (!show) return null;
  if (booksResult.loading) return <p>loading</p>
  const books = booksResult.data.allBooks;

  return (
    <>
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{genre}</b></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default Recommendations;
