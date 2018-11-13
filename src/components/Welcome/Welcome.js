import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Welcome.css';
export default class Welcome extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <section className="component-welcome">
                <h1>Welcome to Memeseum.</h1>
                <h2>Looks like you're not loggedin in, Memer.</h2>
                <div className="welcome-container">
                    <div
                        className="login-error"
                    >
                        <Link
                            to="/login"
                        >
                            Login
                        </Link>
                    </div>
                    <h3>OR</h3>
                    <div
                        className="login-error"
                    >
                        <Link
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}
