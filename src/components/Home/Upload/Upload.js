import React, {Component} from "react";
import UploadModal from "./UploadModal/UploadModal.js";
import "./Upload.css";
import {firebase} from "../../../firebase-config.js";
import api from "../../../api.js";

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileSelected: false,
            isUploaded: undefined,
            uploadProgress: undefined,
            modalIsOpen: false,
            memePreview: undefined,
            newCategory: "",
            memeCategories: [],
            displayName: props.displayName
        };
        this.fileSelected = this.fileSelected.bind(this);
        this.returnFileSize = this.returnFileSize.bind(this);
        this.uploadMeme = this.uploadMeme.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    fileSelected(event) {
        if (event.target.files[0]) {
            this.setState({
                fileSelected: true,
                memePreview: URL.createObjectURL(event.target.files[0])
            });
        } else {
            this.setState({
                fileSelected: false,
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

    handleChange(event) {
        this.setState({newCategory: event.target.value})
    }

    addCategory() {
        const newCategory = this.state.newCategory;
        this.setState({
            memeCategories: this.state.memeCategories.concat(newCategory),
            newCategory: ""
        });
    }

    uploadMeme(event) {
        event.preventDefault();
        this.setState({
            isUploaded: false,
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
                            url: downloadURL,
                            user: this.state.displayName,
                            category: "TEST CATEGORY",
                            likes: 0
                        };
                        let postOptions = {
                            method: 'POST',
                            body: JSON.stringify(postData),
                            headers: new Headers({'Content-type': 'application/json'})
                        };
                        fetch(api.memes_Data, postOptions)
                            .then(res => {
                                let rStat = res.status;
                                if (rStat == 404 || rStat == 500) return;
                                else return res.json();
                            })
                            .then(resJSON => {
                                if (resJSON) {
                                    this.setState({
                                        isUploaded: true,
                                        modalIsOpen: false
                                    }, () => {
                                        alert('Meme Uploaded.');
                                        this.props.getMemes();
                                    });
                                } else {
                                    this.setState({
                                        isUploaded: false,
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

    render() {

        return (
            <section className="upload-meme-section">
                <button
                    className="open-modal-btn"
                    onClick={this.openModal}
                >
                    Upload a meme!
                </button>
                <UploadModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    fileSelected={this.fileSelected}
                    uploadMeme={this.uploadMeme}
                    memeCategories={this.state.memeCategories}
                    memePreview={this.state.memePreview}
                    addCategory={this.addCategory}
                    handleChange={this.handleChange}
                    uploadProgress={this.state.uploadProgress}
                    isUploaded={this.state.isUploaded}
                />
            </section>
        );
    }
}
