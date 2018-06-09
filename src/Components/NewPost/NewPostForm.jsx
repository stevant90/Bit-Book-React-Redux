import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import SimpleForm from '../Shared/Form';
import SimpleInput from '../Shared/Input';
import validator from '../../Util/validator';

export default class NewPostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            imageUrl: '',
            videoUrl: ''
        };
    }

    static propTypes = {
        children: PropTypes.any,
        type: PropTypes.string,
        closeModal: PropTypes.func,
        isLoading: PropTypes.bool,
        submitForm: PropTypes.func,
        clearFormStatus: PropTypes.func,
        errorMessage: PropTypes.string,
        reloadPage: PropTypes.func
    };

    handleInputChange = (name, value) => {

        this.setState({
            [name]: value
        });
    }

    savePost = () => {

        let { type } = this.props;

        let params;

        if (type === 'text') {

            params = {
                text: this.state.text
            };

            this.props.submitForm(params, 'Text', () => {
                if (!this.props.errorMessage) {
                    this.closeModal();
                    this.props.clearFormStatus();
                    this.props.reloadPage();
                }
            });
        }

        if (type === 'image') {

            params = {
                imageUrl: this.state.imageUrl
            };

            this.props.submitForm(params, 'Image', () => {
                if (!this.props.errorMessage) {
                    this.closeModal();
                    this.props.clearFormStatus();
                    this.props.reloadPage();
                }
            });
        }

        if (type === 'video') {

            params = {
                videoUrl: this.state.videoUrl
            };

            this.props.submitForm(params, 'Video', () => {
                if (!this.props.errorMessage) {
                    this.closeModal();
                    this.props.clearFormStatus();
                    this.props.reloadPage();
                }
            });
        }
    }

    closeModal = () => {
        this.props.clearFormStatus();
        this.props.closeModal();
    }

    render() {


        const {
            children,
            type,
            closeModal,
            isLoading,
            submitForm,
            clearFormStatus,
            errorMessage,
        } = this.props;

        return (
            <SimpleForm
                onSubmit={this.savePost}
                formError={errorMessage}
                formErrorHeader='Failed to post!'
            >
                {type === 'text'
                    && <SimpleInput
                        type='text'
                        textArea='textArea'
                        placeholder='Enter text'
                        name='text'
                        onChange={this.handleInputChange}
                        validation={validator.text}
                    />}

                {type === 'image'
                    && <SimpleInput
                        type='url'
                        placeholder='Enter image url'
                        name='imageUrl'
                        onChange={this.handleInputChange}
                        validation={validator.avatarUrl}
                    />}

                {type === 'video'
                    && <SimpleInput
                        type='url'
                        placeholder='Enter video url'
                        name='videoUrl'
                        onChange={this.handleInputChange}
                        validation={validator.avatarUrl}
                    />}

                <Button
                    color='red'
                    onClick={this.closeModal}
                >
                    <Icon name='remove' />
                    Cancel
                    </Button>
                <Button
                    color='green'
                    loading={isLoading}
                    type='submit'
                >
                    <Icon name='checkmark' />
                    Create post
                </Button>

            </SimpleForm>
        );
    }
}