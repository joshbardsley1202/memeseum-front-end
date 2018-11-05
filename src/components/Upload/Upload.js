import React from "react";
import UploadModal from './UploadModal/UploadModal'
import "./Upload.css";
import {firebase} from "../../firebase-config"
import api from '../../api'

export default class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileSelected: false,
            currentUpload: null,
            isUploaded: undefined,
            uploadProgress: undefined,
            modalIsOpen: false,
            memePreview: undefined,
            newCategory: "",
            memeCategories: []
        }
        this.fileSelected = this.fileSelected.bind(this)
        this.returnFileSize = this.returnFileSize.bind(this)
        this.uploadMeme = this.uploadMeme.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.addCategory = this.addCategory.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    openModal() { this.setState({modalIsOpen: true}) }
    closeModal() { this.setState({modalIsOpen: false}) }

    fileSelected(event) {
        if (event.target.files[0]) {
            this.setState({
                fileSelected: true,
                currentUpload: event.target.files[0],
                memePreview: URL.createObjectURL(event.target.files[0])
            })
        } else {
            this.setState({
                fileSelected: false,
                currentUpload: null
            })
        }
    }

    returnFileSize(number) {
        var imgSize = undefined
        if (number < 1024) {
            imgSize = number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            imgSize = (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            imgSize = (number / 1048576).toFixed(1) + 'MB';
        } else return false
        if (imgSize.indexOf('M') !== -1) {
            imgSize = imgSize.substring(0, imgSize.indexOf('M'))
            if (parseInt(imgSize) <= 5) return true
            else return false
        } else return true
    }
    handleChange(event){
        this.setState({ newCategory: event.target.value })
    }
    addCategory(){
        const newCategory = this.state.newCategory
        this.setState({
            memeCategories: this.state.memeCategories.concat(newCategory),
            newCategory: ""
        })
    }
    uploadMeme(event) {
        event.preventDefault()
        this.setState({
            isUploaded: false,
            uploadProgress: 0
        })
        
        var formData = new FormData(event.target)
        var file = formData.get('file')
        if (this.returnFileSize(file.size)) {
            var storage = firebase.app().storage();
            var storageRef = firebase.storage().ref();
            var metadata = {contentType: file.type};
            var uploadTask = storageRef.child(file.name).put(file, metadata);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
                this.setState({ uploadProgress: ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%' })
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        break;
                }
            }, error => {
                console.log(error)
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
                        var currentDate = new Date()
                        var formattedDate = (
                            currentDate.getMonth() + '/' +
                            currentDate.getDay() + '/' +
                            currentDate.getFullYear()
                        )
                        var postData = {
                            url: downloadURL,
                            user: "TEST",
                            category: "TEST CATEGORY",
                            likes: 0

                        };
                        var postOptions = {
                            method: 'POST',
                            body: JSON.stringify(postData),
                            headers: new Headers({'Content-type': 'application/json'})
                        }
                        fetch(api.postsDatabaseURl, postOptions)
                            .then(res => {
                                if (res.status === 404 || res.status === 500) return undefined
                                else return res.json()
                            })
                            .then(resJSON => {
                                if (resJSON === undefined) {
                                    this.setState({isUploaded: false}, () => {
                                        alert('Oops, something went wrong. \n the file has been uploaded, but our database was not able to retrieve the meta data.')
                                        this.setState({
                                            isUploaded: undefined,
                                            exifEdit: false,
                                            fileSelected: false,
                                            currentUpload: null,
                                        })
                                    })
                                } else {
                                    this.setState({
                                        isUploaded: true,
                                        modalIsOpen: false
                                    }, () => {
                                        alert('Meme Uploaded.')
                                        this.props.getMemes();
                                    })
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
