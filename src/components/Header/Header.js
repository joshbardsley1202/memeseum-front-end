import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./Header.css";
import memeseumLogo from "../../assets/memeseum_main.png"
// import Sidenav from "../Sidenav/Sidenav" TODO: Removed implementation, really only looks good semanticly on mobile.

import homeImg from '../../assets/logos/home.png';
import notificationsImg from '../../assets/logos/notifications.png';
import profileImg from '../../assets/logos/profile.png';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(props) {
        let headerOptions = null;
        if(!this.props.nAuth_Header){
            headerOptions = (
                <React.Fragment>
                    <div className="header-main-search">
                        <form>
                            <p>BETA</p>
                            <input
                                type="text"
                                name="search"
                                placeholder="🔍 search"
                            />
                        </form>
                    </div>
                    <nav>
                        <div>
                            <Link
                                to="/"
                                className="nav-button"
                            >
                                <img
                                    src={homeImg}
                                />
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/notfications"
                                className="nav-button"
                            >
                                <img
                                    src={notificationsImg}
                                />
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/profile"
                                className="nav-button"
                            >
                                <img
                                    src={profileImg}
                                />
                            </Link>
                        </div>
                    </nav>
                </React.Fragment>
            )
        }
        return (
            <header className="component-header">
                <div className="header-main-logo">
                    <img src={memeseumLogo}/>
                </div>
                {headerOptions}
            </header>
        );
    }
}
