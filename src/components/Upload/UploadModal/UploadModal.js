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
                <div className={props.memePreview ? "meme-preview" : "hidden-preview"}>
                    <img src={props.memePreview} />
                </div>
                <div className="meme-info">
                    <h1> Upload a meme </h1>
                    <form
                        className='modal-upload'
                        onSubmit={props.uploadMeme}
                    >
                        <label className='cabinet upload-btn upload-field'>
                            Browse
                            <input
                                className='file-select upload-field'
                                onChange={props.fileSelected}
                                type='file'
                                name='file'
                                accept=".png, .jpg, .jpeg"
                                required
                            />
                        </label>
                        <div className={props.memePreview ? "meme-data" : "hidden-preview"}>
                            <section className="category-section upload-field">
                                <input
                                    className="category-selection"
                                    placeholder="Add categories."
                                    value={props.newCategory}
                                    name="category"
                                    type="text"
                                    onChange={props.handleChange}
                                />
                                <buton
                                    className="add-category-btn"
                                    onClick={props.addCategory}
                                >
                                    ✔️
                                </buton>
                            </section>
                            <div className="added-categories">
                                {
                                    props.memeCategories.length>0
                                        ?
                                            props.memeCategories.map(category => (
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={this.removeMeme}
                                                    >
                                                        ❌
                                                    </button>
                                                    <p>{category}</p>

                                                </div>
                                            ))
                                        :
                                            null
                                }
                            </div>
                            <textarea
                                className="upload-field"
                                type="text"
                                placeholder="Add a caption."
                            />
                            <input
                                className='upload-btn'
                                type='submit'
                                value="Upload"
                            />
                        </div>
                    </form>
                </div>
            </section>

        </Modal>
    )

}
export default UploadModal