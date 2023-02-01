const filter = (forFilter) => ({
  type: "FILTER",
  payload: forFilter
});


const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload
    default: return state;
  }
}

export default filterReducer;
export { filter };
