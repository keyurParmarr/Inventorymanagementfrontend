import React, { useState } from "react";
import "./Sidebar.style.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
const activeSubLink = ({ isActive }) => (isActive ? "active" : "link");
const activeLink = ({ isActive }) => (isActive ? "active" : "link");
export const SidebarItem = ({ item, isOpen, index }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </div>
        <div className="sidebar-content">
          {item.childrens.map((item, index) => {
            return (
              <div className="s-child" key={index}>
                <NavLink to={item.path} className={activeSubLink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      <span>
                        {item.icon && <div className="icon">{item.icon}</div>}
                        {isOpen && <div>{item.title}</div>}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};
