import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload
    }
  }
})

export const { setUser } = userInfoSlice.actions;
export const loadUser = (id) => (async dispatch => {
  const user = await userService.getUser(id);
  dispatch(setUser(user));
})

export default userInfoSlice.reducer;
