import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const NewBlog = ({ addBlog, notify }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const createdBlog = await blogService.createBlog({ title, url, author });
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`);
      addBlog(createdBlog);
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

NewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

export default NewBlog;
