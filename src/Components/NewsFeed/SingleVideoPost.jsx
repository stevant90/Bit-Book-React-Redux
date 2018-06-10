import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import { Grid, Feed, Icon, Segment, Message, Button, Popup } from 'semantic-ui-react';

export default class SingleVideoPost extends Component {

    static propTypes = {
        post: PropTypes.object,
        errorMessage: PropTypes.string,
        deletePost: PropTypes.func,
        deleteErrorMessage: PropTypes.string,
        ownId: PropTypes.number,
    };

    delete = () => {
        const { id } = this.props.post;

        this.props.deletePost(id);
    }

    render() {

        const { post, errorMessage, ownId } = this.props;
        const { dateCreated, commentsNum, videoUrl, userDisplayName, userId } = post;

        const postDate = new Date(dateCreated);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();
        const displayComments = commentsNum > 1 ? 'Comments' : 'Comment'

        let deleteBtn = ownId === userId ? <Popup trigger={<Button onClick={this.delete} color='red' icon='trash' />} content='Delete' inverted /> : '';

        const rootEmbedUrl = 'https://www.youtube.com/embed/';
        const partOfUrl = 'https://youtu.be/';
        const listUrl = '&list='
        let youTubeVideoUrl;

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
            <Grid stackable>
                <Link to='/' className='h-paddingALL--sm'><Icon name='angle double left' size='large' />Go back</Link>

                {!!errorMessage
                    && <Message
                        error
                        header='Whoops!'
                        content={errorMessage}
                    />}

                <Segment className='SinglePost'>
                    <Grid.Row>
                        <Feed>
                            {deleteBtn}
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Link to={`/people/${userId}`}>{userDisplayName}</Link>
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
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Grid.Row>
                </Segment>
            </Grid>
        );
    }
}