import React from "react";
import { logoutUser } from "../../SERVICES/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectName, SET_LOGIN } from "../../REDUX/AUTH/Auth";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };
  const name = useSelector(selectName);
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome</span>
          <span className="--color-danger"> {name}</span>
        </h3>
        <button className="--btn --btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
