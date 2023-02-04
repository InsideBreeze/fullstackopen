import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      dispatch(addBlog({ title, url, author }))
      dispatch(dispatch(setNotification(`a new blog ${title} by ${author} added`)))
      setTimeout(() => dispatch(clearNotification()), 5000);
      setTitle("");
      setUrl("");
      setAuthor("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button style={hideWhenVisible} onClick={() => setVisible(!visible)}>
        new note
      </button>
      <div style={showWhenVisible}>
        <form onSubmit={createBlog}>
          <h2>create new</h2>
          <div>
            title:{" "}
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            author:{" "}
            <input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            url:{" "}
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setVisible(!visible)}>cancel</button>
      </div>
    </>
  );
};


export default NewBlog;
