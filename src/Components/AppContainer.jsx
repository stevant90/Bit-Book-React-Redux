import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Message } from 'semantic-ui-react';

import AppHeader from './Header';
import AppFooter from './Footer';

const Aux = props => props.children;

class _AppContainer extends Component {

    static propTypes = {
        Component: PropTypes.any,
        requiresLogin: PropTypes.bool,
        hasHeaderAndFooter: PropTypes.bool,
        isLoggedIn: PropTypes.bool,
        sessionId: PropTypes.string,
        history: PropTypes.object
    };

    static defaultProps = {
        requiresLogin: true,
        hasHeaderAndFooter: true
    };

    sessionStorageEnabled = () => {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.getItem('test');

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
                {hasHeaderAndFooter && this.withLoginRedirect(AppFooter)}
            </Aux>
        ) : (
                <main className='sessionStorageError h-textCenter'>
                    <img src='../../assets/img/error.gif' className='SessionStorageError__photo' />
                    <Message
                        error
                        className='h-textCenter'
                        header='Session storage unavailable'
                        content='This app requires you to have cookies enabled. We use it to authenticate you and to save your preferences. Please enable it and refresh the page.'
                    />
                </main>
            );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.loginStatus.isLoggedIn,
        sessionId: state.loginStatus.sessionId
    };
}

const AppContainer = connect(mapStateToProps, null)(_AppContainer);

export default withRouter(AppContainer);