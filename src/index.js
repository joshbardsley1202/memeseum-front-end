import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom"

import Header from "./components/Header/Header"

import Sidenav from "./components/Sidenav/Sidenav"
import Profile from "./components/Profile/Profile"
import Home from "./components/Home/Home"


class App extends Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(
            <BrowserRouter>
                <div className="App">
                    <header>
                        <Header/>
                        <Sidenav/>
                    </header>
                    
                    <div>
                        <Switch>
                            <Route 
                                exact
                                path="/"
                                component={Home}
                            />
                            <Route path = "/Profile" component = {Profile}/>
                        </Switch>
                        
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}



ReactDOM.render(

<App />
,
document.getElementById('root'));
registerServiceWorker();


/*
return (
      <Router>
      
      </Router>
    );
*/