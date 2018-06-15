import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Icon, Popup } from 'semantic-ui-react';

import { fetchUsers } from '../../Redux/actions/people/usersList';
import UsersList from './UsersList';
import SearchBar from '../Shared/Search';

class UsersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            display: 'none'
        };
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

    backToTop = () => {

        this.setState({ display: 'none' });

        if (window.scrollY > 1000) {
            this.setState({ display: 'block' });
        }
    }

    topOfThePage = () => {
        window.scroll(0, 0);
    }

    render() {
        const { users } = this.state;
        const { errorMessage } = this.props;

        if (!users) {
            return <Loader content='Loading' />
        }

        const backToTopBtn = <Popup
            inverted
            content='Back to top'
            trigger={<Icon onClick={this.topOfThePage} name='arrow circle up' size='huge' color='teal' className='backToTopBtn' style={{ display: this.state.display }} />}
            hideOnScroll
        >
        </Popup>;


        return (
            <Grid className='UsersPage'>
                <Grid.Row className='Search'>
                    <SearchBar onSearch={this.onSearchRequest} />
                </Grid.Row>
                <Grid.Row>
                    {users.map(user => {
                        return <UsersList user={user} key={user.id} errorMessage={errorMessage} />
                    })}
                </Grid.Row>
                {backToTopBtn}
                <InfiniteScroll
                    onScroll={this.backToTop}
                />
            </Grid>
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