import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Message } from 'semantic-ui-react';

import AppHeader from './Header';

const Aux = props => props.children;

export class _AppContainer extends Component {

    static propTypes = {
        Component: PropTypes.any,
        requiresLogin: PropTypes.bool,
        hasHeaderAndFooter: PropTypes.bool,
        isLoggedIn: PropTypes.bool
    };

    static defaultProps = {
        requiresLogin: true,
        hasHeaderAndFooter: true
    };

    sessionStorageEnabled = () => {
        try {
            localStorage.setItem('test', 'test');
            localStorage.getItem('test');

            return true;
        } catch (e) {
            return false;
        }
    }

    withLoginRedirect = Component => {
        const { isLoggedIn, requiresLogin } = this.props;

        if (requiresLogin) {
            return isLoggedIn ? <Component /> : <Redirect to='/login' />;
        }
    }

    render() {

        const { hasHeaderAndFooter, requiresLogin, Component } = this.props;

        return this.sessionStorageEnabled() ? (
            <Aux>
                {hasHeaderAndFooter && this.withLoginRedirect(AppHeader)}
                {requiresLogin
                    ? <main>{this.withLoginRedirect(Component)}</main>
                    : <Component />}
            </Aux>
        ) : (
                <main className='localStorageError h-textCenter'>
                    <img src='../../assets/img/error.gif' className='LocalStorageError__photo' />
                    <Message
                        error
                        className='h-textCenter'
                        header='Local storage unavailable'
                        content='This app requires you to have cookies enabled. We use it to authenticate you and to save your preferences. Please enable it and refresh the page.'
                    />
                </main>
            );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.loginStatus.isLoggedIn,
    };
}

const AppContainer = connect(mapStateToProps, null)(_AppContainer);

export default withRouter(AppContainer);