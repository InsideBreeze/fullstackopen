import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
// import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { initBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./reducers/userReducer";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);


  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());
  };


  // sort blogs by their likes

  const menuStyle = {
    backgroundColor: "#d9d9d9",
    display: "flex",
    gap: "10px",
    fontSize: "20px",
    padding: "8px"
  };

  return (
    <div>
      <div style={menuStyle}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {
          user === null && <Link to="/login">login</Link>
        }
        {user !== null && <>
          <span>{`${user.name} logged in`}</span>
          <button onClick={logout}>logout</button>
        </>}
      </div>
      {/* {user === null && <LoginForm />} */}
      <h2>blog app</h2>
      <Notification />
      {/* {user !== null && ( */}
      {/*   <p> */}
      {/*     {`${user.username} logged in`}{" "} */}
      {/*     <button onClick={logout}>logout</button> */}
      {/*   </p> */}
      {/* )} */}
      {/* {user !== null && <NewBlog />} */}
      <Routes>
        <Route path="/users/*" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/" element={<App />} /> */}

      </Routes>
      {/* {sortedBlogs.map((blog) => ( */}
      {/*   <div style={blogStyle} key={blog.id}> */}
      {/*     <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> */}
      {/*   </div> */}
      {/*   /\* <Blog *\/ */}
      {/*   /\*   key={blog.id} *\/ */}
      {/*   /\*   blog={blog} *\/ */}
      {/*   /\* /> *\/ */}
      {/* ))} */}
    </div>
  );
};

export default App;
