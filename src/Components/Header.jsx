import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Menu, Button, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import { clearFormStatus } from '../Redux/actions/clearFormStatus';
import { logout } from '../Redux/actions/auth/logout';
import NewPostContainer from './NewPost/NewPostContainer';

class _AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: props.location.pathname,
        };
    }

    static propTypes = {
        history: PropTypes.object,
        logout: PropTypes.func,
        clearFormStatus: PropTypes.func,
        location: PropTypes.object,
    }

    handleLogout = () => {
        this.props.logout();
        this.props.history.replace('/login');
        this.props.clearFormStatus();
    }

    handleItemClick = activeItem => {

        this.setState({ activeItem });
    };

    render() {

        const menuHeader = <h2>Bit Book &nbsp;<Icon name='book' size='large' /></h2>

        return (
            <Segment inverted >
                <Menu inverted pointing secondary stackable>
                    <Menu.Header
                        className='h-marginR--md'
                        content={menuHeader}
                    />
                    <Link
                        to='/'
                        className={this.state.activeItem === '/' ? "item active" : "item"}
                        onClick={() => this.handleItemClick('/')}
                    >
                        Home
                    </Link>
                    <Link
                        to='/people'
                        className={this.state.activeItem === '/people' ? "item active" : "item"}
                        onClick={() => this.handleItemClick('/people')}
                    >
                        People
                    </Link>
                    <Link
                        to='/profile'
                        className={this.state.activeItem === '/profile' ? "item active" : "item"}
                        onClick={() => this.handleItemClick('/profile')}
                    >
                        Profile
                    </Link>
                    <Menu.Item>
                        <NewPostContainer />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item className='logout_btn'>
                            <Button color='teal' onClick={this.handleLogout}>Logout</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        },
        clearFormStatus: () => {
            return dispatch(clearFormStatus());
        }
    };
}

const AppHeader = connect(null, mapDispatchToProps)(_AppHeader);

export default withRouter(AppHeader);