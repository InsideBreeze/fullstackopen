import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initUsers } from "../reducers/usersReducer";

const User = () => {

  const id = useParams().id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initUsers());
  }, [])

  const user = useSelector(({ users }) => users.find(u => u.id === id));
  if (!user) return null;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blog</h3>
      {
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      }
    </>
  )
}

export default User;
