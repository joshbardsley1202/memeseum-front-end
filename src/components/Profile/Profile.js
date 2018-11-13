import React, {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import {firebase} from '../../firebase-config'
import api from '../../api.js';
import loading from '../../assets/loading.gif'
import settings from '../../assets/logos/settings.png'
import defaultProfilePicture from '../../assets/default-profile-picture.png'

import "./Profile.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userWasFound: undefined,
            isAuthenticated: undefined, //TODO: For development purposes only, reset to undefined
            dataHasRendered: false,
            userData: {
                displayName: null,
                profilePicture: null,
                firstName: null,
                lastName: null,
                bio: null
            }


        };
        this.isUserLoggedin = this.isUserLoggedin.bind(this);
        this.retreieveUserData = this.retreieveUserData.bind(this);
    }

    isUserLoggedin() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isAuthenticated: true
                }, () => {
                    this.retreieveUserData(user.displayName)
                });
            } else {
                this.setState({
                    isAuthenticated: false
                });
            }
        });
    }

    retreieveUserData(displayName) {
        fetch(api.userInfo_Data + displayName)
            .then(res => {
                if (res.status === 404) {
                    this.setState({userWasFound: false});
                    return undefined;
                }
                else return res.json();
            })
            .then(resJSON => {
                if (resJSON === undefined) alert('Oops, something went wrong. \n User was not found in our database.');
                else {
                    this.setState({
                        userWasFound: true,
                        userData: {
                            displayName,
                            pictureUrl: resJSON.user.profilePicture,
                            firstName: resJSON.user.firstName,
                            lastName: resJSON.user.lastName,
                            bio: resJSON.user.bio
                        }
                    });
                }
            })
            .catch(error => console.error(error))
    }

    componentDidMount() {
        this.isUserLoggedin();
    }

    render() {
        let profile = null;
        if (this.state.isAuthenticated == undefined) {
            profile = (
                <div className="loading-gif">
                    <img
                        src={loading}
                    />
                </div>
            )
        } else if (this.state.isAuthenticated == false) {
            return (
                <Redirect
                    to="/welcome"
                />
            )
        } else {
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
                                <h1>{this.state.userData.displayName}</h1>
                                <div className="account-options">
                                    <button
                                        className="btn-edit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-settings"
                                    >
                                        <img src={settings}/>
                                    </button>
                                </div>
                            </div>
                            <div className="profile-info">
                                {/*<h3>{this.state.userData.firstName + " " + this.state.userData.lastName}</h3>*/}
                                <p>{this.state.userData.bio}</p>

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return (
            <section className="component-profile">
                {profile}
            </section>
        );
    }
}
