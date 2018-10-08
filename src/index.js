import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import './App.css';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom"

import Header from "./components/Header/Header"
// import Sidenav from "./components/Sidenav/Sidenav"
import Profile from "./components/Profile/Profile"
import Home from "./components/Home/Home"
import Login from './components/Login/Login'
import About from './components/About/About'
import Signup from './components/Signup/Signup'
class App extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <div>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={Home}
                            />
                            <Route
                                path="/Profile"
                                component={Profile}
                            />
                            <Route
                                path="/Login"
                                component={Login}
                            />
                            <Route
                                path="/About"
                                component={About}
                            />
                            <Route
                                path="/Signup"
                                component={Signup}
                            />
                        </Switch>

                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render( <App/> , document.getElementById('root'));
registerServiceWorker();