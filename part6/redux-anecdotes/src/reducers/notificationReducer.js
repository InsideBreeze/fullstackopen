import { createSlice } from "@reduxjs/toolkit";

let timeoutId = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    clearNotify(state, action) {
      return null;
    }
  }
})

export default notificationSlice.reducer;
export const { notify, clearNotify } = notificationSlice.actions;

export const setNotification = (notifcation, time) => (dispatch => {
  dispatch(notify(notifcation));
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  } else {
    timeoutId = setTimeout(() => dispatch(clearNotify()), time);
  }
})
