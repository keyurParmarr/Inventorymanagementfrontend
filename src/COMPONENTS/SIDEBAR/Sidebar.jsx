import React, { useState } from "react";
import "./Sidebar.style.scss";
import menu from "../DATA/SidebarData";
import { RiProductHuntLine } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";
export const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <RiProductHuntLine
              size={35}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return (
            <SidebarItem
              index={index}
              isOpen={isOpen}
              item={item}
              key={index}
            />
          );
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};
