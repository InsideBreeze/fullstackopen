import React from "react";
import "./notification.css";

const Notification = ({ text, success }) => {
  if (text === null) {
    return null;
  }
  return <div className={`${success ? "success" : "error"}`}>{text}</div>;
};

export default Notification;
