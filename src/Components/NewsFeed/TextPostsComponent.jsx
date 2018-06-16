import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Feed, Icon } from 'semantic-ui-react';

export default class TextPostComponent extends Component {

    static propTypes = {
        post: PropTypes.object,
        displayPostDate: PropTypes.string,
        postTime: PropTypes.string,
        comments: PropTypes.number
    };

    render() {

        const { post, displayPostDate, postTime, comments } = this.props;
        const { userId, userDisplayName, commentsNum, text, id } = post;

        const displayComments = comments > 1 ? 'Comments' : 'Comment'
        
        return (

            <Segment className='FeedPage__segment'>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Link to={`/people/${userId}`}>{userDisplayName}</Link> posted a text post
                                    <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text>
                                {text}
                            </Feed.Extra>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name='comment' />
                                    {commentsNum} {displayComments}
                                </Feed.Like>
                            </Feed.Meta>
                            <Link to={`/feed/TextPosts/${id}`} className='SinglePostLink'>Read more >>></Link>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Segment>
        );
    }
}