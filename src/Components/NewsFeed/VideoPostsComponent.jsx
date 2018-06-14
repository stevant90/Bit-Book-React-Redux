import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import { Grid, Segment, Feed, Icon } from 'semantic-ui-react';

export default class ImagePostComponent extends Component {

    static propTypes = {
        post: PropTypes.object,
        displayPostDate: PropTypes.string,
        postTime: PropTypes.string,
        comments: PropTypes.number,
        videoUrl: PropTypes.string
    };

    render() {

        const { post, displayPostDate, postTime, comments, videoUrl } = this.props;
        const { userId, userDisplayName, commentsNum, imageUrl, id } = post;

        const displayComments = comments > 1 ? 'Comments' : 'Comment'        

        let youTubeVideoUrl;

        const rootEmbedUrl = 'https://www.youtube.com/embed/';
        const partOfUrl = 'https://youtu.be/';
        const listUrl = '&list='

        if (videoUrl !== undefined) {
            youTubeVideoUrl = videoUrl.slice(videoUrl.indexOf('=') + 1);
        }

        if (videoUrl !== undefined && videoUrl.includes(partOfUrl)) {
            youTubeVideoUrl = videoUrl.slice(partOfUrl.length);
        } else if (videoUrl !== undefined && videoUrl.includes(rootEmbedUrl)) {
            youTubeVideoUrl = videoUrl.slice(rootEmbedUrl.length);
        } else if (videoUrl !== undefined && videoUrl.includes(listUrl)) {
            youTubeVideoUrl = videoUrl.slice(videoUrl.indexOf('=') + 1, videoUrl.indexOf('&'))
        }


        return (

            <Segment className='FeedPage__segment'>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Link to={`/people/${userId}`}>{userDisplayName}</Link> posted a video post
                                <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra>
                                <Iframe
                                    url={`https://www.youtube.com/embed/${youTubeVideoUrl}`}
                                    display="initial"
                                    position="relative"
                                    allowFullScreen
                                    height='300px'
                                />
                            </Feed.Extra>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name='comment' />
                                    {commentsNum} {displayComments}
                                </Feed.Like>
                            </Feed.Meta>
                            <Link to={`/feed/VideoPosts/${id}`} className='SinglePostLink'>Read more >>></Link>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Segment>

        );
    }
}