import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import NewBlog from "./NewBlog";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = [...useSelector(state => state.blogs)];
  const user = useSelector(state => state.user);


  useEffect(() => {
    dispatch(initBlogs());
  }, []);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      {user !== null && <NewBlog />}
      {sortedBlogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </>
  )
}

export default Blogs;
