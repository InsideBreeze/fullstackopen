import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.notification);

  if (message === null) {
    return null;
  }
  const style = {
    height: "30px",
    backgroundColor: "#d9d9d9",
    padding: "5px",
    borderRadius: "5px",
    color: "green",
  };
  return <div style={style}>{message}</div>;
};

export default Notification;
