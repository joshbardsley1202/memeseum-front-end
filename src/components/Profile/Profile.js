import React, { Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { firebase } from '../../firebase-config'
import loading from '../../assets/loading.gif'
import defaultProfilePicture from '../../assets/default-profile-picture.png'
import "./Profile.css";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userWasFound: undefined,
            isAuthenticated: true, //TODO: For development purposes only, reset to undefined
            dataHasRendered: false,
            userData:{
                displayName: null,
                profilePicture: null,
                // firstName: user.firstName,
                // lastName: user.lastName,
                // age: user.age,
                // bio: user.bio
            }
        }
        this.isUserLoggedin = this.isUserLoggedin.bind(this)
        this.retreieveUserData = this.retreieveUserData.bind(this)
    }
    isUserLoggedin(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({
                    isAuthenticated: true,
                    userData:{ displayName: user.displayName }
                }, () => { this.retreieveUserData() })
            }else{
                this.setState({
                    isAuthenticated: false
                })
            }
        });
    }
    retreieveUserData(displayName){
        // fetch(apis.userInfo + displayName)
        //     .then(res => {
        //         if(res.status === 404){
        //             this.setState({ userWasFound: false })
        //             return undefined
        //         }
        //         else return res.json()
        //     })
        //     .then(resJSON => {
        //         if(resJSON === undefined) alert('Oops, something went wrong. \n User was not found in our database.')
        //         else{
        //             this.setState({
        //                 userWasFound: true,
        //                 userData: {
        //                     pictureUrl: user.profilePicture
        //                     //TODO: Data memebers that you can add in time if you'd like.
        //                     // firstName: user.firstName,
        //                     // lastName: user.lastName,
        //                     // age: user.age,
        //                     // bio: user.bio
        //                 }
        //             })
        //         }
        //     })
        //     .catch(error => console.error(error))
    }
    componentDidMount(){
        // this.isUserLoggedin()
    }
    render() {
        var profile = null
        if(this.state.isAuthenticated == undefined){
            profile = (
                <div className="loading-gif">
                    <img
                        src={loading}
                    />
                </div>
            )
        }else if(this.state.isAuthenticated == false){
            profile = (
                <React.Fragment>
                    <h1>Oops, looks like your not signed in.</h1>
                    <div id="login-error">
                        <Link
                            to="/login"
                        >
                            Login
                        </Link>
                    </div>
                </React.Fragment>
            )
        }else{
            profile = (
                <React.Fragment>
                    <div className="account">
                        <div className="account-profile-img">
                            <img
                                src={defaultProfilePicture}
                            />
                        </div>
                        <div className="account-info">
                            <div className="account-header">
                                <h1>[NAME HERE]</h1>
                                <div className="account-options">
                                    <button>Logout</button>
                                    <button>Edit</button>
                                </div>

                            </div>
                            <div className="profile-info">

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <section className="component-profile">
                {profile}
            </section>
        );
    }
}
