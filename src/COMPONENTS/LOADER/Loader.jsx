import React from "react";
import Loadingimg from "../../ASSETS/loader.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";
export const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={Loadingimg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={Loadingimg} alt="Loading..." />
    </div>
  );
};
