import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { login } from '../../Redux/actions/auth/login';
import { clearFormStatus } from '../../Redux/actions/clearFormStatus';
import UserForm from './UserForm';

class _Login extends React.Component {

    static propTypes = {
        login: PropTypes.func,
        errorMessage: PropTypes.string,
        clearFormStatus: PropTypes.func,
        isLoading: PropTypes.bool,
        history: PropTypes.object,
    };

    redirectToHome = () => {
        this.props.history.replace('/');
    }

    render() {

        const { errorMessage, clearFormStatus, isLoading } = this.props;

        return (
            <UserForm
                handleSubmit={this.props.login.bind(null, this.redirectToHome)}
                formMode='login'
                formError={errorMessage}
                clearFormStatus={clearFormStatus}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.loginStatus.errorMessage,
        isLoading: state.loginStatus.isLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (redirectCallback, params) => {
            return dispatch(login(redirectCallback, params));
        },
        clearFormStatus: () => {
            return dispatch(clearFormStatus());
        },
    };
}

const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);

export default withRouter(Login);