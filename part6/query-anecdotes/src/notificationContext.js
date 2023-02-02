import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext(null);

const notificationReducer = (state, action) => {
  if (action.type === "NOTIFY") {
    return action.payload
  }
  if (action.type === "CLEAR") {
    return null;
  }
  return state
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
}

const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider;
