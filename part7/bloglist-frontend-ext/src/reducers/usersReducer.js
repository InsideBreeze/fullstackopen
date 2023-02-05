import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload
    },
  }
})

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
export const initUsers = () => (async dispatch => {
  const users = await userService.getUsers();
  dispatch(setUsers(users));
})
