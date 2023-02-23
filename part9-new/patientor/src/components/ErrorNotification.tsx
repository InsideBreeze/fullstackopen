import React from "react";

const ErrorNotification = ({ message }: { message: string | null }) => {
  if (message === null) return null;
  return <div style={{ color: "red" }}>{message}</div>;
};

export default ErrorNotification;
