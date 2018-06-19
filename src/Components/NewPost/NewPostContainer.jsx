import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Modal, Button, Form, TextArea, Header } from 'semantic-ui-react';

import { newPost } from '../../Redux/actions/newsFeed/newPost';
import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import { uploadImage } from '../../Redux/actions/profile/uploadImage';
import { clearFormStatus } from '../../Redux/actions/clearFormStatus';
import NewPostModal from './NewPostModal';

class NewPostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textModalOpened: false,
            imageModalOpened: false,
            videoModalOpened: false,
            type: ''

        };
    }

    static propTypes = {
        newPost: PropTypes.func,
        clearFormStatus: PropTypes.func,
        errorMessage: PropTypes.string,
        isLoading: PropTypes.bool,
        fetchPosts: PropTypes.func,
        uploadImage: PropTypes.func
    };


    openTextModal = dimmer => () => this.setState({ dimmer, textModalOpened: true, type: 'text' });
    openImageModal = dimmer => () => this.setState({ dimmer, imageModalOpened: true, type: 'image' });
    openVideoModal = dimmer => () => this.setState({ dimmer, videoModalOpened: true, type: 'video' });
    closeModal = () => this.setState({
        textModalOpened: false,
        imageModalOpened: false,
        videoModalOpened: false
    });


    render() {

        const { newPost, clearFormStatus, errorMessage, isLoading, fetchPosts, uploadImage } = this.props;

        const { dimmer, textModalOpened, imageModalOpened, videoModalOpened, type } = this.state;

        return (
            <div>
                <Dropdown text='Create'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.openTextModal(true)}><Icon name='file text' />Text post</Dropdown.Item>
                        <Dropdown.Item onClick={this.openImageModal(true)}><Icon name='image' />Image post</Dropdown.Item>
                        <Dropdown.Item onClick={this.openVideoModal(true)}><Icon name='video' />Video post</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <NewPostModal
                    dimmer={dimmer}
                    textModalOpened={textModalOpened}
                    imageModalOpened={imageModalOpened}
                    videoModalOpened={videoModalOpened}
                    closeModal={this.closeModal}
                    isLoading={isLoading}
                    type={type}
                    errorMessage={errorMessage}
                    submitForm={newPost}
                    clearFormStatus={clearFormStatus}
                    fetchPosts={fetchPosts}
                    uploadImage={uploadImage}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.newPost.errorMessage,
        isLoading: state.newPost.isLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        newPost: (params, type, callback) => {
            dispatch(newPost(params, type, callback));
        },
        fetchPosts: () => {
            dispatch(fetchPosts());
        },
        clearFormStatus: () => {
            dispatch(clearFormStatus());
        },
        uploadImage: (params, callback) => {
            dispatch(uploadImage(params, callback));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer);