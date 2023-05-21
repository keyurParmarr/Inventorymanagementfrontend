import React from "react";
import { Footer } from "../FOOTER/Footer";
import { Header } from "../HEADER/Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
      <Footer />
    </div>
  );
};
