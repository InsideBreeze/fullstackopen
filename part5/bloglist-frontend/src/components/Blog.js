import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onLike, onRemove }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const likeBlog = async (id) => {
    try {
      await blogService.updateBlog(id, { ...blog, likes: blog.likes + 1 });
      onLike(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeBlog = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(id);
        onRemove(id);
      } catch (error) {
        console.log(error.message);
      }
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
        {blog.likes} <button onClick={() => likeBlog(blog.id)}>likes</button>{" "}
        <br />
        {blog?.user?.username} <br />
        {blog?.user?.username ===
          JSON.parse(window.localStorage.getItem("loggedUser")).username && (
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
