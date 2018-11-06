import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './Signup.css'
import { firebase } from '../../firebase-config.js'
import api from '../../api'
import gifLoading from '../../assets/uploading.gif'
export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state={
            signingUp: false,
            signedUp: undefined,
            email: undefined,
            displayName: undefined,
            signupErr: ""
        }
        this.onSignupSubmit = this.onSignupSubmit.bind(this)
    }
    onSignupSubmit(event){
        event.preventDefault()
        this.setState({signingUp: true})
        var formData = new FormData(event.target)
        var signUpCredentials={
            displayName: formData.get('displayName'),
            email: formData.get('email'),
            profilePicture: event.target[1].files[0],
            password: formData.get('password1'),
            password2: formData.get('password2')
        }
        if(signUpCredentials.password != signUpCredentials.password2){
            alert('Your passwords do not match, please try again.')
        }else{
            firebase.auth().createUserWithEmailAndPassword(
                signUpCredentials.email,
                signUpCredentials.password
            )
                .then(res => {
                    if(res.additionalUserInfo.isNewUser){
                        var user = firebase.auth().currentUser;
                        user.sendEmailVerification()
                            .then(() => {

                            })
                            .catch((error) => {
                                this.setState({
                                    signupErr: this.state.signupErr + "\n" + error
                                })
                            });
                        
                        firebase.auth().currentUser.updateProfile({
                            displayName: signUpCredentials.displayName
                        })
                            .then(() => {
                                this.createUser({
                                    displayName: signUpCredentials.displayName,
                                    profilePictureUrl: signUpCredentials.photoUrl
                                })
                                this.setState({
                                    displayName: signUpCredentials.displayName,
                                    email: signUpCredentials.displayName
                                })
                                firebase.auth().signOut()
                            })
                    }
                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error(errorCode)
                    this.setState({
                        signupErr: this.state.signupErr + "\n" + error
                    })
                    alert(errorMessage)
                });
        }
    }
    createUser(signUpCredentials){
        var postOptions = {
            method: 'POST',
            body: JSON.stringify(signUpCredentials),
            headers: new Headers({ 'Content-type': 'application/json'})
        }
        fetch(api.userInfo_Data, postOptions)
            .then(res => {
                if(res.status===404 || res.status ===500){
                    alert('Oops, something went wrong. User could not be created.')
                    this.setState({
                        signedUp: false,
                        signingUp: false,
                        database_ERR: true,
                        signupErr: this.state.signupErr + "\n" + res
                    })
                }
                else{
                    this.setState({ 
                        signedUp: true,
                        signingUp: false
                    })
                }
                
            })
            .catch(error => console.error(error))
    }

    render() {
        let signUp = null;
        let signupBtn = null;
        if(this.state.signingUp == true){
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
                        {/*TODO: Optional, but you can implement this later in another way (/Profile) perhaps?*/}
                        {/*<div>*/}
                            {/*<label>First name:</label>*/}
                            {/*<input*/}
                                {/*autoFocus*/}
                                {/*required*/}
                                {/*type="text"*/}
                                {/*name="fistName"*/}
                            {/*/>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                            {/*<label>Last name:</label>*/}
                            {/*<input*/}
                                {/*required*/}
                                {/*type="text"*/}
                                {/*name="lastName"*/}
                            {/*/>*/}
                        {/*</div>*/}
                        <div>
                            <label>Display name:</label>
                            <input
                                required
                                type="text"
                                name="displayName"
                                disabled={this.state.signingUp}
                            />
                        </div>
                        <div>
                            <label>Profile picture: [Disabled]</label>
                            <input
                                disabled
                                type="file"
                                name="profilePicture"
                                disabled={this.state.signingUp}
                            />
                        </div>
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
                                type="password"
                                name="password2"
                                disabled={this.state.signingUp}
                            />
                        </div>
                        {signupBtn}
                    </form>
                </React.Fragment>
            )
        }else if(this.state.signedUp == false || this.state.signupErr!=""){
            signUp = (
                <div className="signup-status">
                    <h1>Oops, this is embarrasing... </h1>
                    <h3>There apears to have been a problem creating this account.</h3>
                    <h4>{"Error(s): " + this.state.signupErr}</h4>
                </div>
            )
            
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