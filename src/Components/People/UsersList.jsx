import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Label, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class UsersList extends Component {

    static propTypes = {
        user: PropTypes.object,
        users: PropTypes.object,
        errorMessage: PropTypes.string
    };

    render() {

        const { user, errorMessage } = this.props;

        const postDate = new Date(user.lastPostDate).toDateString();

        const linkToSIngleUser = <h3><Link to={`/people/${user.id}`}>{user.name}</Link></h3>

        const avatarBackup = 'http://via.placeholder.com/350x300';


        return (

            <Item.Group unstackable divided>
                {!!errorMessage
                    && <Message
                        error
                        header='Whoops!'
                        content={errorMessage}
                    />}
                <Item>
                    <Item.Image size='small' src={user.avatarUrl ? user.avatarUrl : avatarBackup} />
                    <Item.Content>
                        <Item.Header>{linkToSIngleUser}</Item.Header>
                        <Item.Description>
                            <p>{user.aboutShort}</p>
                        </Item.Description>
                        <Label color='teal'>Last post at: {postDate}</Label>
                    </Item.Content>
                </Item>
                <hr />
            </Item.Group>

        );
    }
}

