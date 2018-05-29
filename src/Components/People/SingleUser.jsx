import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Header, Card, Label, Message } from 'semantic-ui-react';

export default class SingleUser extends Component {

    static propTypes = {
        user: PropTypes.object,
        errorMessage: PropTypes.string
    };

    render() {

        const { user, errorMessage } = this.props;

        const avatarBackup = 'http://via.placeholder.com/350x150';

        return (
            <div className='SingleUser'>
                {!!errorMessage
                    && <Message
                        error
                        header='Whoops!'
                        content={errorMessage}
                    />}
                <Card centered={true} fluid={true}>
                    <Image src={user.avatarUrl ? user.avatarUrl : avatarBackup} />
                    <Card.Content>
                        <Card.Header>
                            {user.name}
                        </Card.Header>
                        <Card.Meta>
                            <span>
                                {user.shortAbout}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {user.about}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Label color='teal' attached='bottom left'>
                            <Icon name='pin' />
                            Posts
                                <Label.Detail>{user.postsCount}</Label.Detail>
                        </Label>

                        <Label color='teal' attached='bottom right'>
                            <Icon name='commenting outline' />
                            Comments
                                <Label.Detail>{user.commentsCount}</Label.Detail>
                        </Label>
                    </Card.Content>
                </Card>
            </div>
        );
    }
} 
