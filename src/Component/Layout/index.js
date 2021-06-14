import React from "react";
import Header from "../Header";
import MenuHeader from "../MenuHeader";
import { Scroll } from "../Scroll";
import "./style.css";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <MenuHeader />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
