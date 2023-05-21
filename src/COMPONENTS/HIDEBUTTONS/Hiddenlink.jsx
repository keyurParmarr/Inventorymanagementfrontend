import React from "react";
import { useSelector } from "react-redux";
import { selectIsloggedIn } from "../../REDUX/AUTH/Auth";
export const ShowloggedIn = ({ children }) => {
  const isloggedin = useSelector(selectIsloggedIn);
  if (isloggedin) {
    return <>{children}</>;
  }
  return null;
};
export const ShowLogout = ({ children }) => {
  const isloggedin = useSelector(selectIsloggedIn);
  if (!isloggedin) {
    return <>{children}</>;
  }
  return null;
};
