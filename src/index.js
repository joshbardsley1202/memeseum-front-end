import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom"
import {firebase} from './firebase-config';
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import About from "./components/About/About";
import Signup from "./components/Signup/Signup";
import Reset from "./components/Login/Reset/Reset";

class App extends Component {
    constructor() {
        super()
        this.state = {
            isAuthenticated: true
        }
        this.isUserLoggedin = this.isUserLoggedin.bind(this);
    }

    isUserLoggedin() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) this.setState({isAuthenticated: true});
            else this.setState({isAuthenticated: false});
        });
    }

    componentWillMount() {
        this.isUserLoggedin();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header/>
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
                        <Route
                            path="/reset"
                            component={Reset}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();