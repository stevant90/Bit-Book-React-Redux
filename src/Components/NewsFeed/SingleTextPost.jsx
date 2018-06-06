import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Message, Segment, Feed, Icon } from 'semantic-ui-react';

export default class SingleTextPost extends Component {

    static propTypes = {
        post: PropTypes.object,
        errorMessage: PropTypes.string
    };

    render() {

        const { post, errorMessage } = this.props;
        const { text, userDisplayName, userId, dateCreated, commentsNum } = post;

        const postDate = new Date(dateCreated);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();
        const displayComments = commentsNum > 1 ? 'Comments' : 'Comment'


        return (
            <Grid stackable>

                {!!errorMessage
                    && <Message
                        error
                        header='Whoops!'
                        content={errorMessage}
                    />}

                <Segment className='SinglePost'>
                    <Grid.Row>
                        <Feed>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Link to={`/people/${userId}`}>{userDisplayName}</Link>
                                    <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra text className='h-textRight'>
                                        {text}
                                    </Feed.Extra>
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='comment' />
                                            {commentsNum} {displayComments}
                                        </Feed.Like>
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Grid.Row>
                </Segment>
            </Grid>
        );
    }
}