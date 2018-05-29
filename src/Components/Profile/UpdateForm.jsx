import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

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

    handleSubmit = () => {


        const params = {
            name: this.state.name,
            email: this.state.email,
            avatarUrl: this.state.avatarUrl,
            aboutShort: this.state.aboutShort,
            about: this.state.about,

        }

        this.props.updateProfile(params, () => {
            this.props.close();
            this.props.clearFormStatus();
            this.props.refreshProfile();
        });

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
                    name='name'
                    onChange={this.handleInputChange}
                    validation={validator.name}
                    value={this.state.name}
                />
                <SimpleInput
                    type='email'
                    placeholder='Email'
                    name='email'
                    onChange={this.handleInputChange}
                    validation={validator.email}
                    value={this.state.email}
                />
                <SimpleInput
                    type='text'
                    placeholder='Image url'
                    name='avatarUrl'
                    onChange={this.handleInputChange}
                    validation={validator.avatarUrl}
                    value={this.state.avatarUrl}
                />
                <SimpleInput
                    type='text'
                    placeholder='About'
                    name='about'
                    onChange={this.handleInputChange}
                    validation={validator.about}
                    value={this.state.about}
                />
                <SimpleInput
                    type='text'
                    placeholder='About Short'
                    name='aboutShort'
                    onChange={this.handleInputChange}
                    validation={validator.aboutShort}
                    value={this.state.aboutShort}
                />

                <Button color='red' onClick={close}>
                    Cancel
                    </Button>
                <Button positive icon='checkmark' labelPosition='right' content="Save changes" type='submit' loading={isLoading} />
            </SimpleForm>

        );
    }
}