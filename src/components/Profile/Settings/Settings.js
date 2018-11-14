import React, {Component} from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Helvetica',
        borderRadius: '5px'
    }
};

const Settings = (props) => {
    return(
        <Modal
            isOpen={props.settingsModalOpen}
            onRequestClose={props.closeSettingsModal}
            style={customStyles}
        >
            <h1>Settings</h1>
        </Modal>
    )
};

export default Settings