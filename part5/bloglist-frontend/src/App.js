import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  }

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  }

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }

  return (
    <div>
      {user === null && <LoginForm setUser={setUser} notify={notify} />}
      <h2>blogs</h2>
      <Notification message={notification} />
      {user !== null && <p>{`${user.username} logged in`} <button onClick={logout}>logout</button></p>}
      {user !== null && <NewBlog addBlog={addBlog} notify={notify} />}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
