import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';


import NewPostForm from './NewPostForm';

export default class NewPostModal extends Component {

    static propTypes = {
        dimmer: PropTypes.bool,
        textModalOpened: PropTypes.bool,
        imageModalOpened: PropTypes.bool,
        videoModalOpened: PropTypes.bool,
        closeModal: PropTypes.func,
        isLoading: PropTypes.bool,
        type: PropTypes.string,
        clearFormStatus: PropTypes.func,
        submitForm: PropTypes.func,
        errorMessage: PropTypes.string,
        fetchPosts: PropTypes.func,
        uploadImage: PropTypes.func
    };

    render() {

        const {
            dimmer,
            textModalOpened,
            imageModalOpened,
            videoModalOpened,
            closeModal,
            isLoading,
            type,
            clearFormStatus,
            submitForm,
            errorMessage,
            fetchPosts,
            uploadImage
        } = this.props;

        let open;
        let icon;
        let content;

        if (type === 'text') {
            open = textModalOpened;
            icon = 'file text';
            content = 'Text post';
        } else if (type === 'image') {
            open = imageModalOpened;
            icon = 'image';
            content = 'Image post';
        } else if (type === 'video') {
            open = videoModalOpened;
            icon = 'video';
            content = 'Video post';
        }

        return (
            <Modal dimmer={dimmer} open={open} onClose={closeModal}>
                <Header icon={icon} content={content} />
                <Modal.Content>
                    <NewPostForm
                        type={type}
                        closeModal={closeModal}
                        isLoading={isLoading}
                        submitForm={submitForm}
                        clearFormStatus={clearFormStatus}
                        errorMessage={errorMessage}
                        reloadPage={fetchPosts}
                        uploadImage={uploadImage}
                    />
                </Modal.Content>
            </Modal>
        );
    }
}