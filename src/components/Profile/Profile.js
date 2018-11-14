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
            editModalOpen: true, // TODO: Reset to false
            settingsModalOpen: false,

            profilePictureUploaded: undefined,
            profilePictureSelected: false,
            currentCrop: null,
            profilePreview: null,
            uploadProgress: undefined,

            newName: null,
            newBio: null,

        };
        this.isUserLoggedin = this.isUserLoggedin.bind(this);
        this.retreieveUserData = this.retreieveUserData.bind(this);

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);

        this.openSettingsModal = this.openSettingsModal.bind(this);
        this.closeSettingsModal = this.closeSettingsModal.bind(this);

        this.returnFileSize = this.returnFileSize.bind(this);
        this.uploadProfilePicture = this.uploadProfilePicture.bind(this);
        this.fileSelected = this.fileSelected.bind(this);
        this.handleCrop = this.handleCrop.bind(this);



    }

    openEditModal() { this.setState({editModalOpen: true}); }
    closeEditModal() { this.setState({editModalOpen: false}); }
    openSettingsModal() { this.setState({settingsModalOpen: true}); }
    closeSettingsModal() { this.setState({settingsModalOpen: false}); }
    onEditSubmit(update){
        //TODO implement
    }
    handleCrop(image){ this.setState({ currentUpload: image }); }

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

    uploadProfilePicture(event) { //TODO: fix EVENT for just the file, OR remove and pull from state for the image upload
        event.preventDefault();
        this.setState({
            profilePictureUploaded: false,
            uploadProgress: 0
        });
        let formData = new FormData(event.target);
        let file = formData.get('file');
        if (this.returnFileSize(file.size)) {
            let storage = firebase.app().storage(); // Unused
            let storageRef = firebase.storage().ref();
            let metadata = {contentType: file.type};
            let uploadTask = storageRef.child(file.name).put(file, metadata);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
                this.setState({uploadProgress: ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'});
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        break;
                }
            }, error => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        let postData = {
                            profilePicture: downloadURL,
                            displayName: this.state.displayName
                        };
                        let postOptions = {
                            method: 'PUT',
                            body: JSON.stringify(postData),
                            headers: new Headers({'Content-type': 'application/json'})
                        };
                        fetch(api.userInfo_Data, postOptions)
                            .then(res => {
                                let rStat = res.status;
                                if (rStat == 404 || rStat == 500) return;
                                else return res.json();
                            })
                            .then(resJSON => {
                                if (resJSON) {
                                    this.setState({
                                        profilePictureUploaded: true,
                                    });
                                } else {
                                    this.setState({
                                        profilePictureUploaded: false,
                                        fileSelected: false,
                                    }, () => {
                                        alert('Something went wrong uploading this meme.');
                                    });
                                }
                            })
                    });
            });
        } else {
            alert('Sorry, this file is too big \n Max size is 5MB')
        }
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
                        profilePreview: resJSON.user.profilePicture,
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
                        fileSelected={this.fileSelected}
                        onEditSubmit={this.onEditSubmit}
                        profilePreview={this.state.profilePreview}
                        profilePictureSelected={this.state.profilePictureSelected}
                        handleCrop={this.handleCrop}
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
