import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const EditAuthor = ({ names }) => {
  const [author, setAuthor] = useState(names[0]);
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({
      variables: {
        name: author,
        setBornTo: parseInt(born),
      },
    });
    setBorn("");
  };

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            {names.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born <input value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default EditAuthor;
