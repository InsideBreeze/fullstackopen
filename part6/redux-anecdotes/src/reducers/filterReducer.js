import { createSlice } from "@reduxjs/toolkit";

// const filter = (forFilter) => ({
//   type: "FILTER",
//   payload: forFilter
// });


// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "FILTER":
//       return action.payload
//     default: return state;
//   }
// }

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      return action.payload;
    }
  }
})

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
