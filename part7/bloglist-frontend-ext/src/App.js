import { useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { initBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = [...useSelector(state => state.blogs)];
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
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user === null && <LoginForm />}
      <h2>blogs</h2>
      <Notification />
      {user !== null && (
        <p>
          {`${user.username} logged in`}{" "}
          <button onClick={logout}>logout</button>
        </p>
      )}
      {user !== null && <NewBlog />}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
