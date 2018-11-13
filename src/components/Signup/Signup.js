import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './Signup.css';
import { firebase } from '../../firebase-config.js';
import api from '../../api';
import gifLoading from '../../assets/uploading.gif';
import memeEmoji from '../../assets/crazy_crying_emoji.png';
export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            signingUp: false,
            signedUp: undefined,
            email: undefined,
            displayName: undefined,

            signupErr: [],
            err_password: false,
            err_displayName: false,

        };
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.resetDisplayNameErr = this.resetDisplayNameErr.bind(this);
        this.resetPasswordErr = this.resetPasswordErr.bind(this);
    }
    resetDisplayNameErr(){
        if(this.state.err_displayName){
            this.setState({ err_displayName: false });
        }
    }
    resetPasswordErr(){
        if(this.state.err_password){
            this.setState({ err_password: false })
        }
    }
    onSignupSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        let signUpCredentials = {

            displayName: formData.get('displayName'),
            email: formData.get('email'),
            password1: formData.get('password1'),
            password2: formData.get('password2')
        };
        this.setState({signingUp: true});
        fetch(api.userInfo_Data + signUpCredentials.displayName)
            .then(res => res.json())
            .then(resJSON => {
                let err_displayName = !!resJSON.user;
                let err_password = signUpCredentials.password1 !== signUpCredentials.password2;
                this.setState({
                    err_displayName,
                    err_password
                });
                return(err_displayName || err_password);
            })
            .then(errs => {
                if(errs){
                    this.setState({ signingUp: false })
                }else{
                    firebase.auth().createUserWithEmailAndPassword(
                        signUpCredentials.email,
                        signUpCredentials.password1
                    )
                        .then(res => {
                            if(res.additionalUserInfo.isNewUser){
                                let user = firebase.auth().currentUser;
                                user.sendEmailVerification()
                                    .then(() => {})
                                    .catch((error) => {
                                        this.setState({
                                            signupErr: [...this.state.signupErr, JSON.stringify(error)]
                                        });
                                    });
                                firebase.auth().currentUser.updateProfile({
                                    displayName: signUpCredentials.displayName
                                })
                                    .then(() => {
                                        this.createUser({
                                            displayName: signUpCredentials.displayName
                                        });
                                        this.setState({
                                            displayName: signUpCredentials.displayName,
                                            email: signUpCredentials.displayName
                                        });
                                        firebase.auth().signOut();
                                    })
                            }
                        })
                        .catch(error => {
                            this.setState({
                                signupErr: [...this.state.signupErr, error.message],
                                signedUp: false,
                                signingUp: false
                            });
                        });
                }
            })
    }
    createUser(signUpCredentials){
        let postOptions = {
            method: 'POST',
            body: JSON.stringify(signUpCredentials),
            headers: new Headers({ 'Content-type': 'application/json'})
        };
        fetch(api.userInfo_Data, postOptions)
            .then(res => {
                if(res.status===404 || res.status ===500){
                    alert('Oops, something went wrong. User could not be created.');
                    this.setState({
                        signedUp: false,
                        signingUp: false,
                        signupErr: [...this.state.signupErr, res.toString()]
                    });
                } else {
                    this.setState({ 
                        signedUp: true,
                        signingUp: false
                    });
                }
            })
            .catch(error => console.error(error));
    }

    render() {
        let signUp = null;
        let signupBtn = null;
        if(this.state.signingUp){
            signupBtn = (
                <div
                    id="signup-submit-btn"
                    className="signingup-btn"
                >
                    <img src={gifLoading}/>
                </div>
            )
        }else{
            signupBtn = (
                <div>
                    <input
                        id="signup-submit-btn"
                        type="submit"
                        value="Submit"
                        disabled={this.state.signingUp}
                    />
                </div>
            )
        }
        if(this.state.signedUp == undefined){
            signUp = (
                <React.Fragment>
                    <h1>Signup.</h1>
                    <form
                        className="signup-form"
                        onSubmit={this.onSignupSubmit}
                        disabled={this.state.signingUp}
                    >
                        <div>
                            <label>Display name:</label>
                            <input
                                required
                                onChange={this.resetDisplayNameErr}
                                type="text"
                                name="displayName"
                                disabled={this.state.signingUp}
                            />
                            <p
                                className = {
                                    "signup-form-err" + (this.state.err_displayName ? "" : " hidden")
                                }
                            >
                                {(
                                    this.state.err_displayName ?
                                        "❌ This display name is already taken." :
                                        null
                                )}
                            </p>
                        </div>
                        {/*<div>*/}
                            {/*<label>Profile picture: [Disabled]</label>*/}
                            {/*<input*/}
                                {/*disabled*/}
                                {/*type="file"*/}
                                {/*name="profilePicture"*/}
                                {/*disabled={this.state.signingUp}*/}
                            {/*/>*/}
                        {/*</div>*/}
                        <div>
                            <label>Email:</label>
                            <input
                                autoFocus
                                required
                                type="text"
                                name="email"
                                disabled={this.state.signingUp}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                required
                                type="password"
                                name="password1"
                                disabled={this.state.signingUp}
                            />
                        </div>
                        <div>
                            <label>Re-enter Password:</label>
                            <input
                                required
                                onChange={this.resetPasswordErr}
                                type="password"
                                name="password2"
                                disabled={this.state.signingUp}
                            />
                            <p
                                className={
                                    "signup-form-err" + (this.state.err_password ? "" : " hidden")
                                }>
                                {(
                                    this.state.err_password ?
                                        "❌ Passwords must match." :
                                        null
                                )}
                            </p>
                        </div>
                        {signupBtn}
                    </form>
                </React.Fragment>
            )
        }else if(!this.state.signedUp || this.state.signupErr.length !== 0){
            let errors = this.state.signupErr.map(err => {
                return(<p>- {err} </p>)
            });
            //TODO: add redirect for
            signUp = (
                <div className="signup-status">
                    <img src={memeEmoji}/>
                    <h1>Oops, this is embarrassing... </h1>
                    <h3>There appears to have been a problem creating this account.</h3>
                    <div className="signup-errors">
                        {errors}
                    </div>

                </div>
            );
        }else{
            signUp = (
                <div className="signup-status">
                    <h1> {"Welcome, " + this.state.displayName + " 😄"} </h1>
                    <h3> An email has been sent to verify your account. </h3>
                    <h3> Click <Link to="/login">here</Link> once you have verified your email! </h3>
                </div>
            )
        }
        return (
            <section className="component-signup">
                {signUp}
            </section>
        );
    }
}