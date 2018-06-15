import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Image } from 'semantic-ui-react';

import SimpleForm from '../Shared/Form';
import SimpleInput from '../Shared/Input';
import validator from '../../Util/validator';

export default class UpdateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.profile.name,
            email: this.props.profile.email,
            avatarUrl: this.props.profile.avatarUrl,
            aboutShort: this.props.profile.aboutShort,
            about: this.props.profile.about,
            file: '',
            imagePreview: ''
        };
    }

    static propTypes = {
        updateProfile: PropTypes.func,
        formError: PropTypes.string,
        isLoading: PropTypes.bool,
        close: PropTypes.func,
        children: PropTypes.any,
        clearFormStatus: PropTypes.func,
        refreshProfile: PropTypes.func,
        profile: PropTypes.object,
        uploadImage: PropTypes.func,
    };

    componentWillReceiveProps() {
        this.setState({
            name: this.props.profile.name,
            email: this.props.profile.email,
            avatarUrl: this.props.profile.avatarUrl,
            aboutShort: this.props.profile.aboutShort,
            about: this.props.profile.about
        });
    }

    handleInputChange = (name, value) => {

        this.setState({ [name]: value });
    }

    handleFileChange = event => {

        let file = event.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file,
                imagePreview: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    handleSubmit = () => {

        const { file } = this.state;
        let params;

        if (file === '') {
            params = {
                name: this.state.name,
                email: this.state.email,
                avatarUrl: this.state.avatarUrl,
                aboutShort: this.state.aboutShort,
                about: this.state.about,
            }

            this.props.updateProfile(params, () => {
                if (!this.props.formError) {
                    this.props.close();
                    this.props.clearFormStatus();
                    this.props.refreshProfile();
                }
            });

        } else {

            params = {
                name: this.state.name,
                email: this.state.email,
                aboutShort: this.state.aboutShort,
                about: this.state.about,

            }

            this.props.uploadImage(file, response => {
                params.avatarUrl = response

                this.props.updateProfile(params, () => {
                    this.props.close();
                    this.props.clearFormStatus();
                    this.props.refreshProfile();
                });
            });
        }
    }

    closeModal = () => {
        this.props.clearFormStatus();
        this.props.close();
    }

    render() {

        const {
            updateProfile,
            formError,
            isLoading,
            close,
            children,
            clearFormStatus,
            refreshProfile,
            profile,
            uploadImage,
        } = this.props;


        return (

            <SimpleForm
                onSubmit={this.handleSubmit}
                formError={formError}
                formErrorHeader='Update failed'
            >

                <SimpleInput
                    type='text'
                    placeholder='Name'
                    label='Name'
                    name='name'
                    onChange={this.handleInputChange}
                    validation={validator.name}
                    value={this.state.name}
                />
                <SimpleInput
                    type='email'
                    placeholder='Email'
                    label='Email'
                    name='email'
                    onChange={this.handleInputChange}
                    validation={validator.email}
                    value={this.state.email}
                />
                <SimpleInput
                    type='text'
                    placeholder='Image url'
                    label='Image url'
                    name='avatarUrl'
                    onChange={this.handleInputChange}
                    validation={validator.avatarUrl}
                    value={this.state.avatarUrl}
                />
                <SimpleInput
                    type='text'
                    placeholder='About'
                    label='About'
                    name='about'
                    onChange={this.handleInputChange}
                    validation={validator.about}
                    value={this.state.about}
                />
                <SimpleInput
                    type='text'
                    placeholder='About Short'
                    label='About Short'
                    name='aboutShort'
                    onChange={this.handleInputChange}
                    validation={validator.aboutShort}
                    value={this.state.aboutShort}
                />

                <Form.Input
                    type='file'
                    name='file'
                    label='Upload image'
                    onChange={this.handleFileChange}
                />

                <Image size='small' src={this.state.imagePreview} className='h-paddingALL--sm' />


                <Button color='red' onClick={this.closeModal}>
                    Cancel
                    </Button>
                <Button positive icon='checkmark' labelPosition='right' content="Save changes" type='submit' loading={isLoading} />

            </SimpleForm>

        );
    }
}