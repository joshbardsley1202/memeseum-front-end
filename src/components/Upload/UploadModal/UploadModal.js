import Modal from 'react-modal'
import './UploadModal.css'
import React from "react";

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

const UploadModal = (props) => {
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Edit Profile"
        >
            <section className="component-upload-modal">
                <h1> Upload a meme </h1>
                <form
                    className='modal-upload'
                    onSubmit={this.uploadMeme}
                >
                    <label className='cabinet upload-field'>
                        Add a meme.
                        <input
                            className='file-select upload-field flex-row flex-center'
                            onChange={this.fileSelected}
                            type='file'
                            name='file'
                            accept=".png, .jpg, .jpeg"
                            required
                        />
                    </label>
                    <select>
                        {
                            props.categories.map(category => (
                                <option>{category}</option>
                            ))
                        }
                    </select>
                    <input
                        className='upload-picture'
                        type='submit'
                        value="Upload"
                    />
                </form>
            </section>

        </Modal>
    )

}
export default UploadModal