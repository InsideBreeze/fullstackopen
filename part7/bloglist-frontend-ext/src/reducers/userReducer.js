import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const login = (userToLogin) => (async (dispatch) => {
  try {
    const user = await loginService.login(userToLogin);
    dispatch(setUser(user));
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
  } catch (error) {
    dispatch(setNotification("wrong username or password"));
    setTimeout(() => dispatch(clearNotification()), 5000);
  }
})

