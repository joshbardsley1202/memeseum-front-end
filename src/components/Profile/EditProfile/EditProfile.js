import React, {Component} from "react";
import Modal from "react-modal";
import Cropper from 'react-cropper'
import "./EditProfile.css";
import 'cropperjs/dist/cropper.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Helvetica',
        borderRadius: '5px'
    }
};
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { //Only for two way data binding on the name and the bio.
            name: props.name,
            bio: props.bio,
        };

        this.onCropEnd = this.onCropEnd.bind(this);
        this.getBlob = this.getBlob.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onBioChange = this.onBioChange.bind(this);

    }

    onNameChange(event) {
        this.setState({name: event.target.value}); //Two way data binding ONLY
        this.props.onNameChange(event.target.value);
    }

    onBioChange(event) {
        this.setState({bio: event.target.value}); //Two way data binding ONLY
        this.props.onBioChange(event.target.value);
    }

    getBlob(blob) {
        this.props.handleCrop(blob);
    }

    onCropEnd() {
        this.refs.cropper.getCroppedCanvas().toBlob(this.getBlob);
    }

    render(props) {
        let profileImage = null;
        if (this.props.profilePreview) {
            profileImage = (
                <section className="profile-edit-preview-container">
                    <Cropper
                        ref='cropper'
                        src={this.props.profilePreview}
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        aspectRatio={1 / 1}
                        guides={true}
                        cropend={this.onCropEnd}
                    />
                </section>
            )
        }
        let updating = null;
        if(this.props.updating){
            updating = (
                <p>Updating...</p>
            )
        }
        return (
            <Modal
                isOpen={this.props.editModalOpen}
                onRequestClose={this.props.closeEditModal}
                style={customStyles}
            >
                <section className="component-edit-profile">
                    <div className="submit-edit-container">
                        <h1>Edit Profile </h1>
                        <div>
                            <button
                                onClick={this.props.onEditSubmit}
                            >Save
                            </button>
                        </div>
                    </div>
                    {updating}
                    <form>
                        <p className="head-info">Profile Information</p>
                        <div className="edit-info-field">
                            <label>Name</label>
                            <p className="foot-info">(Optional) First and last name.</p>
                            <input
                                className="edit-form-input"
                                type="text"
                                name="name"
                                onChange={this.onNameChange}
                                value={this.state.name}
                            />
                        </div>
                        <div className="edit-info-field">
                            <label>Bio</label>
                            <p className="foot-info">(Optional) A brief description of yourself shown on your
                                profile.</p>
                            <textarea
                                className="edit-form-input"
                                type="text"
                                name="bio"
                                onChange={this.onBioChange}
                                value={this.state.bio}
                            />
                        </div>
                        <p className="head-info">Images</p>
                        <div className="edit-info-field">
                            {profileImage}
                            <label>Profile Image</label>
                            <p className="foot-info">Images must be .png or .jpg format</p>
                            <label
                                className='cabinet upload-btn upload-field'
                                id="pro-pic-select"
                            >
                                Browse
                                <input
                                    className='file-select upload-field'
                                    onChange={this.props.fileSelected}
                                    type='file'
                                    name='file'
                                    accept=".png, .jpg, .jpeg"
                                    required
                                />
                            </label>
                        </div>
                    </form>
                </section>
            </Modal>
        )
    }
}