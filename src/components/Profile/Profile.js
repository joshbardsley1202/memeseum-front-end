import React, {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile.js";
import Settings from "./Settings/Settings.js";
import {firebase} from "../../firebase-config.js";
import api from "../../api.js";
import loading from "../../assets/loading.gif";
import settings from "../../assets/logos/settings.png";
import edit from "../../assets/logos/pencil.png";
import defaultProfilePicture from "../../assets/default-profile-picture.png";

import "./Profile.css";
import memeEmoji from "../../assets/crazy_crying_emoji.png";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userWasFound: undefined,
            isAuthenticated: undefined, // TODO: For development purposes only, reset to undefined
            dataHasRendered: undefined,
            userData: {
                displayName: null,
                profilePicture: null,
                name: null,
                bio: null
            },
            newName: null,
            newBio: null,
            editModalOpen: true, // TODO: Reset to false
            settingsModalOpen: false,

            profilePictureUploaded: undefined, // Determines wether the file has been uploaded
            profilePictureSelected: false, // Determines if the use has selected a picture to upload
            currentUpload: null, // Holds the value of a [type] BLOB that has the image with crop that the user wants to upload
            profilePreview: null, // Used as props only, to hold a REF of the image displayed in the cop modal

            updating: false
        };
        this.isUserLoggedin = this.isUserLoggedin.bind(this);
        this.retreieveUserData = this.retreieveUserData.bind(this);

        //Modal Settings
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openSettingsModal = this.openSettingsModal.bind(this);
        this.closeSettingsModal = this.closeSettingsModal.bind(this);

        //For files
        this.returnFileSize = this.returnFileSize.bind(this);
        this.fileSelected = this.fileSelected.bind(this);
        this.handleCrop = this.handleCrop.bind(this);

        this.onNameChange = this.onNameChange.bind(this);
        this.onBioChange = this.onBioChange.bind(this);

        this.onEditSubmit = this.onEditSubmit.bind(this);

    }

    openEditModal() {
        this.setState({editModalOpen: true});
    }

    closeEditModal() {
        this.setState({editModalOpen: false});
    }

    openSettingsModal() {
        this.setState({settingsModalOpen: true});
    }

    closeSettingsModal() {
        this.setState({settingsModalOpen: false});
    }

    onNameChange(newName) {
        this.setState({newName});
    }

    onBioChange(newBio) {
        this.setState({newBio});
    }


    onEditSubmit() {
        let changes = {};
        var postUpdate = (profilePicture, fireBaseError) => {
            if (!fireBaseError) {
                if (profilePicture) changes.profilePicture = profilePicture;
                let postOptions = {
                    method: 'PUT',
                    body: JSON.stringify(changes),
                    headers: new Headers({'Content-type': 'application/json'})
                };
                fetch(api.userInfo_Data + this.state.userData.displayName, postOptions)
                    .then(res => {
                        let rStat = res.status;
                        if (rStat == 404 || rStat == 500) return;
                        else return res.json();
                    })
                    .then(resJSON => {
                        if (resJSON) {
                            this.setState({
                                updating: false,
                                editModalOpening: false
                            }, () => {
                                alert("Profile Updated ✅");
                                this.retreieveUserData(this.state.userData.displayName);
                            });
                        } else {
                            this.setState({
                                profilePictureUploaded: false,
                                editModalOpen: false
                            }, () => {
                                alert('Something went wrong updating your profile ❌');
                            });
                        }
                    })
            } else {
                this.setState({
                    profilePictureUploaded: (fireBaseError ? false : true),
                    uploading: false
                }, () => {
                    alert("Something went wrong with uploading your profile picture.")
                });
            }
        };
        if (this.state.newName) changes.name = this.state.newName;
        if (this.state.newBio) changes.bio = this.state.newBio;
        if (
            Object.keys(changes).length !== 0 ||
            this.state.currentUpload !== null
        ) {
            if (this.state.currentUpload != null) {
                var fireBaseError = null;
                let file = this.state.currentUpload;
                let storage = firebase.app().storage(); // Unused
                let storageRef = firebase.storage().ref();
                let metadata = {contentType: file.type};
                let uploadTask = storageRef.child('UserProfilePictures/' + this.state.displayName).put(file, metadata);
                this.setState({
                    profilePictureUploaded: false,
                    uploadProgress: 0,
                    updating: true
                });
                if (this.returnFileSize(file.size)) {
                    if (this.state.userData.profilePicture !== null) {
                        let desertRef = firebase.storage().refFromURL(this.state.userData.profilePicture);
                        desertRef.delete()
                            .then(() => {
                                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
                                }, error => {
                                    fireBaseError = error.code
                                }, () => {
                                    uploadTask.snapshot.ref.getDownloadURL()
                                        .then(downloadURL => {
                                            postUpdate(downloadURL, fireBaseError)
                                        });
                                });
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    } else {
                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
                        }, error => {
                            fireBaseError = error.code
                        }, () => {
                            uploadTask.snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    postUpdate(downloadURL);
                                });
                        });
                    }
                } else {
                    this.setState({
                        updating: false,
                        profilePictureUploaded: false
                    });
                    alert("File must be smaller than 5MBs.");
                }
            } else {
                postUpdate();
            }
        } else {
            alert("Nothing to update.");
        }
    }

    handleCrop(image) {
        this.setState({currentUpload: image});
    }

    fileSelected(event) {
        if (event.target.files[0]) {
            this.setState({
                profilePictureSelected: true,
                profilePreview: URL.createObjectURL(event.target.files[0])
            });
        } else {
            this.setState({
                profilePictureSelected: false,
                currentUpload: null
            });
        }
    }

    returnFileSize(number) {
        let imgSize = undefined;
        if (number < 1024) {
            imgSize = number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            imgSize = (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            imgSize = (number / 1048576).toFixed(1) + 'MB';
        } else return false;
        if (imgSize.indexOf('M') !== -1) {
            imgSize = imgSize.substring(0, imgSize.indexOf('M'));
            return parseInt(imgSize) <= 5;
        } else return true
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
        this.setState({dataHasRendered: false});
        fetch(api.userInfo_Data + displayName)
            .then(res => {
                let resStat = res.status;
                if (resStat == 404 || resStat == 500) {
                    this.setState({
                        userWasFound: false,
                        dataHasRendered: true
                    })
                } else return res.json();
            })
            .then(resJSON => {
                if (resJSON === undefined) alert('Oops, something went wrong. \n User was not found in our database.');
                else {
                    this.setState({
                        userWasFound: true,
                        dataHasRendered: true,
                        // profilePreview: resJSON.user.profilePicture,
                        userData: {
                            displayName,
                            profilePicture: resJSON.user.profilePicture,
                            name: resJSON.user.name,
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
        if (this.state.isAuthenticated === undefined || this.state.dataHasRendered === false) {
            profile = (
                <div className="loading-gif">
                    <img
                        src={loading}
                    />
                </div>
            )
        } else if (this.state.isAuthenticated === false) {
            return (
                <Redirect
                    to="/welcome"
                />
            )
        } else if (!this.state.userWasFound) {
            profile = (
                <div className="signup-status">
                    <img src={memeEmoji}/>
                    <h1>Oops, this is embarrassing... </h1>
                    <h3>There appears to have been a problem retrieving data for this account.</h3>
                    <div className="signup-errors">
                        <p> - The server may not be running.</p>
                    </div>
                </div>
            )
        } else {
            profile = (
                <React.Fragment>
                    <div className="account">
                        <div className="account-profile-img">
                            <img
                                src={
                                    this.state.userData.profilePicture ?
                                        this.state.userData.profilePicture :
                                        defaultProfilePicture

                                }
                            />
                        </div>
                        <div className="account-info">
                            <div className="account-header">
                                <h1>{this.state.userData.displayName}</h1>
                                <div className="account-options">
                                    <button
                                        className="btn-settings"
                                        onClick={this.openEditModal}
                                    >
                                        <img src={edit}/>
                                    </button>
                                    <button
                                        className="btn-settings"
                                        onClick={this.openSettingsModal}
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
                    <EditProfile
                        editModalOpen={this.state.editModalOpen}
                        closeEditModal={this.closeEditModal}

                        onNameChange={this.onNameChange}
                        onBioChange={this.onBioChange}

                        name={this.state.userData.name}
                        bio={this.state.userData.bio}

                        profilePreview={this.state.profilePreview}
                        profilePictureSelected={this.state.profilePictureSelected}

                        fileSelected={this.fileSelected}
                        onEditSubmit={this.onEditSubmit}
                        handleCrop={this.handleCrop}
                        currentUpload={this.state.currentUpload}

                        updating={this.state.updating}
                        onEditSubmit={this.onEditSubmit}
                    />
                    <Settings
                        settingsModalOpen={this.state.settingsModalOpen}
                        closeSettingsModal={this.closeSettingsModal}
                    />
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
