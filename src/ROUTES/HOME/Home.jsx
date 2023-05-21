import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import heroImg from "../../ASSETS/inv-img.png";
import {
  ShowloggedIn,
  ShowLogout,
} from "../../COMPONENTS/HIDEBUTTONS/Hiddenlink";
import "./Home.style.scss";
export const Home = () => {
  return (
    <>
      <div className="home">
        <nav className="container --flex-between">
          <div className="logo">
            <RiProductHuntLine size={35} />
          </div>
          <ul className="home-links">
            <ShowLogout>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/register">Register</Link>
                </button>
              </li>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/login">Login</Link>
                </button>
              </li>
            </ShowLogout>
            <ShowloggedIn>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </li>
            </ShowloggedIn>
          </ul>
        </nav>
        <section className="container hero">
          <div className="hero-text">
            <h2>Inventory & Stock Management Solution</h2>
            <p>
              Inventory System to control and mange products in the warehouse in
              real time & integrated to make it easier to develop your buisness.
            </p>
            <div className="hero-buttons">
              <button className="--btn --btn-secondary">
                <Link to="/dashboard">Free Trial 1 Month</Link>
              </button>
            </div>
            <div className="--flex-start">
              <NumberText num="14K" text="Brand Owners" />
              <NumberText num="23K" text="Active Users" />
              <NumberText num="500+" text="Partners" />
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Inventory" />
          </div>
        </section>
      </div>
    </>
  );
};
const NumberText = ({ num, text }) => {
  return (
    <div className="-mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};
