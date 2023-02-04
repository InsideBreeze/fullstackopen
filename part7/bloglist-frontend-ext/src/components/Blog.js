import { useState } from "react";
import { useDispatch } from "react-redux";
// import blogService from "../services/blogs";
import { removeBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const showWhenVisible = { display: visible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteBlog = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(id));
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        {blog.likes}{" "}
        <button onClick={() => dispatch(likeBlog(blog.id))}>likes</button>{" "}
        <br />
        {blog?.user?.username} <br />
        {blog?.user?.username ===
          JSON.parse(window.localStorage.getItem("loggedUser"))?.username && (
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
