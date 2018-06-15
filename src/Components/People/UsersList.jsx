import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Label, Message, Divider } from 'semantic-ui-react';
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

        const linkToSingleUser = <h3><Link to={`/people/${user.id}`}>{user.name}</Link></h3>

        const avatarBackup = 'http://via.placeholder.com/350x300';


        return (

            <Item.Group unstackable divided className='UsersPage__item h-marginL--md'>
                {!!errorMessage
                    && <Message
                        error
                        header='Whoops!'
                        content={errorMessage}
                    />}
                <Item>
                    <Item.Image size='small' src={user.avatarUrl ? user.avatarUrl : avatarBackup} />
                    <Item.Content>
                        <Item.Header>{linkToSingleUser}</Item.Header>
                        <Item.Description>
                            <p>{user.aboutShort}</p>
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Label className='UsersPage__date'>Last post at: {postDate}</Label>
                <Divider />
            </Item.Group>
        );
    }
}

