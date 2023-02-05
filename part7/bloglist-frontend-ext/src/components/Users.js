import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Routes, Link } from "react-router-dom";
import { initUsers } from "../reducers/usersReducer";

const Users = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  // fetch users from backend
  useEffect(() => {
    dispatch(initUsers());
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Routes>
      </Routes>
    </>
  )
}

export default Users
