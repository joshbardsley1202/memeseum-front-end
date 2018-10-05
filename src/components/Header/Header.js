import React from "react";
import "./Header.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav"

export default class Header extends React.Component {
    render() {
        return (
            <header className="component-header">
                <div id="logo-div">
                    <h1 id="logo-header">Memeseum</h1>
                </div>
                <nav>
                    <div
                        id="login-div"
                    >
                        <Link
                            to="/login"
                            id="login-link"
                        >
                            Login
                        </Link>
                    </div>
                    <div>
                        <Sidenav/>
                    </div>
                </nav>
            </header>
        );
    }
}
