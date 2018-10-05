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

class App extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        alert("React RELAY implementation is in beta stages for data driven development. See documentation in console.")
        console.log("https://facebook.github.io/relay/docs/en/introduction-to-relay.html")
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
                        </Switch>

                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render( <App/> , document.getElementById('root'));
registerServiceWorker();