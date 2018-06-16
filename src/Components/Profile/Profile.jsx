import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Header, Card, Label, Message, Grid, GridRow, GridColumn } from 'semantic-ui-react';

import UpdateProfileContainer from './UpdateProfileContainer';

export default class Profile extends Component {

    static propTypes = {
        profile: PropTypes.object,
        errorMessage: PropTypes.string
    };

    render() {

        const { profile, errorMessage } = this.props;

        const avatarBackup = 'http://via.placeholder.com/350x300';

        return (
            <Grid className='ProfilePage'>
                <Grid.Row className='ProfilePage__inner'>
                    {!!errorMessage
                        && <Message
                            error
                            header='Whoops!'
                            content={errorMessage}
                        />}
                    <Card centered={true} fluid={true} className='ProfilePage__card'>
                        <Image src={profile.avatarUrl ? profile.avatarUrl : avatarBackup} />
                        <Card.Content>
                            <Card.Header>
                                {profile.name}
                            </Card.Header>
                            <Card.Meta>
                                <span>
                                    {profile.email}
                                </span>
                            </Card.Meta>
                            <Card.Meta>
                                <span>
                                    {profile.shortAbout}
                                </span>
                            </Card.Meta>
                            <Card.Description>
                                {profile.about}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Label color='teal' attached='bottom left'>
                                <Icon name='pin' />
                                Posts
                            <Label.Detail>{profile.postsCount}</Label.Detail>
                            </Label>

                            <Label color='teal' attached='bottom right'>
                                <Icon name='commenting outline' />
                                Comments
                            <Label.Detail>{profile.commentsCount}</Label.Detail>
                            </Label>
                        </Card.Content>
                    </Card>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column className='ProfilePage__updateProfile'>
                        <UpdateProfileContainer />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}