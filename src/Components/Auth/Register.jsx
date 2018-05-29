import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../Redux/actions/auth/register';
import { clearFormStatus } from '../../Redux/actions/clearFormStatus';
import UserForm from './UserForm';


class Register extends Component {

    static propTypes = {
        errorMessage: PropTypes.string,
        successMessage: PropTypes.string,
        isLoading: PropTypes.bool,
        register: PropTypes.func,
        clearFormStatus: PropTypes.func,
    };

    render() {
        const { errorMessage, successMessage, isLoading, register, clearFormStatus } = this.props;

        return (
            <UserForm
                handleSubmit={register}
                formMode='register'
                formError={errorMessage}
                formSuccess={successMessage}
                clearFormStatus={clearFormStatus}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.registerStatus.errorMessage,
        successMessage: state.registerStatus.successMessage,
        isLoading: state.registerStatus.isLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        register: (params) => {
            return dispatch(register(params));
        },
        clearFormStatus: () => {
            return dispatch(clearFormStatus());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);