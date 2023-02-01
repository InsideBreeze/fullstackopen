import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filter(event.target.value));
  }
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        filter <input onChange={handleChange} />
      </div>
    </>
  )
}

export default Filter;
