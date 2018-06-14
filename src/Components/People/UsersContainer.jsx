import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchUsers } from '../../Redux/actions/people/usersList';
import UsersList from './UsersList';
import SearchBar from '../Shared/Search';

class UsersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { users: [] };
    }

    static propTypes = {
        users: PropTypes.array,
        fetchUsers: PropTypes.func,
        searchPeople: PropTypes.func,
        filteredUsers: PropTypes.array,
        errorMessage: PropTypes.string

    }

    componentWillReceiveProps() {
        this.setState({ users: this.props.users });
    }

    componentDidMount() {
        this.props.fetchUsers();
    }


    onSearchRequest = (searchString) => {

        let filterPeople = _.filter(this.props.users, user => user.name.toLowerCase().includes(searchString.toLowerCase()));

        this.setState({
            users: filterPeople
        });
    }

    render() {
        const { users } = this.state;
        const { errorMessage } = this.props;

        if (!users) {
            return <Loader content='Loading' />
        }

        return (
            <div className='UsersPage'>
                <div className='Search'>
                    <SearchBar onSearch={this.onSearchRequest} />
                </div>
                {users.map(user => {
                    return <UsersList user={user} key={user.id} errorMessage={errorMessage} />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        errorMessage: state.users.errorMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => {
            return dispatch(fetchUsers());
        },
        searchPeople: value => {
            return dispatch(searchPeople(value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);