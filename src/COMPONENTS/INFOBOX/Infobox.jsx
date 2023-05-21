import React from "react";
import "./Infobox.style.scss";
export const Infobox = ({ bgColor, title, icon, count }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className={`info-icon --color-white`}>{icon}</span>
      <span className="info-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};
