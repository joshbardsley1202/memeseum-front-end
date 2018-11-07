import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {firebase} from '../../../firebase-config.js';
import './Reset.css';
import gifLoading from '../../../assets/uploading.gif';
export default class Reset extends Component {
    constructor(props){
        super(props);
        this.state = {
            sendingReset: false,
            resetSent: false,
            firebase_err: "",
        };
        this.submitResetForm = this.submitResetForm.bind(this);
        this.resetEmailField = this.resetEmailField.bind(this);
    }
    resetEmailField(){
        this.setState({firebase_err: ""});
    }
    submitResetForm(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        firebase.auth().sendPasswordResetEmail(formData.get("email"))
            .then(() => {
                this.setState({resetSent: true});
            })
            .catch(error => {
                this.setState({
                    sendingReset: false,
                    firebase_err: error.message
                });
            })
    }
    render() {
        let reset = null;
        let resetSubmitBtn = null;
        if(this.state.sendingReset){
            resetSubmitBtn = (
                <div
                    id="reset-submit-btn"
                    className="reseting-btn"
                >
                    <img
                        src={gifLoading}
                    />
                </div>
            )
        }else{
            resetSubmitBtn = (
                <div>
                    <input
                        id="reset-submit-btn"
                        type="submit"
                        value="Reset"
                        disabled={this.state.sendingReset}
                    />
                </div>
            )
        }
        return (
            <section className="component-reset">
                <h1>Reset Password.</h1>
                <h3>Please complete the following field(s) below.</h3>
                <form
                    onSubmit={this.submitResetForm}
                >

                    <div>
                        <label>Email:</label>
                        <input
                            required
                            name="email"
                            type="email"
                            disabled={this.state.sendingReset}
                            onChange={this.resetEmailField}
                        />
                    </div>
                    <p
                        className = {
                            "signup-form-err" + (
                                this.state.firebase_err !== "" ?
                                    "" :
                                    " hidden"
                            )
                        }
                    >
                        {(
                            this.state.firebase_err !== "" ?
                                "❌ " + this.state.firebase_err :
                                null
                        )}
                    </p>
                    <p
                        className = {
                            "reset-form-complete" + (
                                this.state.resetSent ?
                                    "":
                                    " hidden"
                            )
                        }
                    >
                        {(
                            this.state.resetSent ?
                                "✅ email has been sent." :
                                null
                        )}
                    </p>
                    {resetSubmitBtn}
                </form>
                <p>Return to <Link to="/login">login.</Link></p>
            </section>
        );
    }
}