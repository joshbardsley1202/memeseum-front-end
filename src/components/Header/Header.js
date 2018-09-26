import React from "react";
import "./Header.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav"




export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div id = "logo-div">
            <h1 id="logo-header">Memeseum</h1>
        </div>
        <div id = "login-div">
          <Link to="/login" id = "login-link">Login</Link>
        </div>
        <Sidenav />
      </header>
    );
  }
}
