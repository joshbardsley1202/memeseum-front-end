import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import "./Login.css";
import api from '../../api.js';
import { firebase } from '../../firebase-config.js';
import gifLoading from '../../assets/uploading.gif';
import memeEmoji from "../../assets/crazy_crying_emoji.png";
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUserLoggedIn: false,
            userWasFound: undefined,
            signingIn: false,

            userAge: undefined,
            userBio: undefined,

            database_err: [],
            firebase_err: "",
            redirect: false
        };
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.resetFirebaseErr = this.resetFirebaseErr.bind(this);
    }
    resetFirebaseErr(){
        this.setState({firebase_err: ""})
    }
    setRedirect(){
        this.setState({
            redirect: true,
            userWasFound: true
        });
    }
    onLoginSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        const loginCredentials = {
            email: formData.get("email"),
            password: formData.get("password")
        };
        this.authWithEmailPassword(loginCredentials);
    }

    authWithEmailPassword(loginCredentials){
        this.setState({ signingIn: true });
        firebase.auth().signInWithEmailAndPassword(
            loginCredentials.email,
            loginCredentials.password
        )
            .then(res => { this.retreieveUserData(res.user.displayName); })
            .catch(error => {
                this.setState({
                    firebase_err: error.message,
                    signingIn: false
                })
            });
    }
    retreieveUserData(displayName){
        fetch(api.userInfo_Data + displayName)
            .then(res => {
                if(res.status === 404){
                    this.setState({
                        userWasFound: false,
                        database_err: [...this.state.database_err, res.toString()]
                    });
                    return undefined
                }
                else return res.json()
            })
            .then(resJSON => {
                if(resJSON){
                    alert('Welcome back, ' + resJSON.user.displayName + "! 😁");
                    this.setRedirect();
                }
            })
            .catch(error => {
                this.setState({
                    database_err: [...this.state.database_err, error.toString()]
                })
            })
    }
    render() {
        if(this.state.redirect){
            return(
                <Redirect to='/profile'/>
            )
        }else{
            let login = null;
            if(this.state.database_err.length != 0){
                let errors = this.state.database_err.map(err => {
                    return(<p>- {err} </p>)
                });
                login = (
                    <div className="signup-status">
                        <img src={memeEmoji}/>
                        <h1>Oops, this is embarrassing... </h1>
                        <h3>There appears to have been a problem creating this account.</h3>
                        <div className="signup-errors">
                            {errors}
                        </div>
                    </div>
                )
            }else{
                let loginBtn = null;
                if(this.state.signingIn){
                    loginBtn = (
                        <div
                            id="login-submit-btn"
                            className="loggingin-btn"
                        ><img src={gifLoading}/></div>
                    )
                }else{
                    loginBtn = (
                        <div>
                            <input
                                id="login-submit-btn"
                                type="submit"
                                value="Login"
                            />
                        </div>
                    )
                }
                login = (
                    <React.Fragment>
                        <h1>Welcome back, Memer.</h1>
                        <form
                            className="login-form"
                            onSubmit={this.onLoginSubmit}
                        >
                            <p
                                className = {
                                    "signup-form-err" + (this.state.firebase_err !== "" ? "" : " hidden")
                                }
                            >
                                {(
                                    this.state.firebase_err !== "" ?
                                        "❌ " + this.state.firebase_err :
                                        null
                                )}
                            </p>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    name="email"
                                    placeholder="edp445@sport.com"
                                    disabled={this.state.signingIn}
                                    onChange={this.resetFirebaseErr}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    disabled={this.state.signingIn}
                                />
                            </div>
                            {loginBtn}
                        </form>
                        <p>
                            Don't have an account? Click <Link to="/signup">here</Link>.
                        </p>
                    </React.Fragment>
                )
            }
            return(
                <section className="component-login">
                    {login}
                </section>
            )
        }
    }
}
