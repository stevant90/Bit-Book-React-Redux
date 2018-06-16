import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import { Segment, Feed, Icon, Button, Popup, Message, Image } from 'semantic-ui-react';

import { fetchSinglePost } from '../../Redux/actions/newsFeed/singlePost';
import { fetchProfile } from '../../Redux/actions/profile/profile';
import { deletePost } from '../../Redux/actions/newsFeed/deletePost';
import CommentsContainer from '../Comments/CommentsContainer';

class _SinglePostContainer extends Component {

    static propTypes = {
        fetchSinglePost: PropTypes.func,
        type: PropTypes.string,
        postId: PropTypes.string,
        match: PropTypes.object,
        singlePost: PropTypes.object,
        fetchProfile: PropTypes.func,
        deletePost: PropTypes.func,
        deleteErrorMessage: PropTypes.string,
        profile: PropTypes.object,
        history: PropTypes.object,
    };

    componentDidMount() {
        const { type } = this.props.match.params;
        const { postId } = this.props.match.params;

        this.props.fetchSinglePost(type, postId);

        this.props.fetchProfile();
    }

    refreshPage = () => {
        const { deleteErrorMessage } = this.props;

        if (!deleteErrorMessage) {
            this.props.history.replace('/');
        }
    }

    deletePost = () => {

        const { singlePost } = this.props;
        const { id } = singlePost;

        this.props.deletePost(id, this.refreshPage);
    }

    render() {

        const { singlePost, deletePost, deleteErrorMessage, profile } = this.props;
        const { text, userDisplayName, userId, dateCreated, commentsNum, imageUrl, videoUrl } = singlePost;

        let { postId } = this.props.match.params;

        let ownId;

        if (profile) {
            ownId = profile.userId
        }

        const postDate = new Date(dateCreated);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();
        const displayComments = commentsNum > 1 ? 'Comments' : 'Comment'

        let deleteBtn = ownId === userId && ownId !== undefined ? <Popup trigger={<Button onClick={this.deletePost} color='red' icon='trash' />} content='Delete' inverted /> : '';

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
            <div className='SinglePostPage'>
                <Link to='/' className='h-paddingALL--sm'><Icon name='arrow circle left' size='large' />Go back</Link>
                <Segment className='SinglePostPage__segment'>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                {!!deleteErrorMessage
                                    && <Message
                                        error
                                        content={deleteErrorMessage}
                                    />}
                                <Feed.Summary>
                                    <Link to={`/people/${userId}`}>{userDisplayName}</Link>
                                    <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                                    <span style={{ float: 'right' }} className='h-marginB--sm'>{deleteBtn}</span>
                                </Feed.Summary>
                                <Feed.Extra>
                                    {singlePost.type === 'text' && <p>{text}</p>}
                                    {singlePost.type === 'image' && <Image size='massive' src={imageUrl} />}
                                    {singlePost.type === 'video'
                                        && <Iframe
                                            url={`https://www.youtube.com/embed/${youTubeVideoUrl}`}
                                            display="initial"
                                            position="relative"
                                            allowFullScreen
                                            height='300px'
                                        />}
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
                </Segment>
                {<CommentsContainer postId={postId} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        singlePost: state.singlePost.post,
        deleteErrorMessage: state.deletePost.errorMessage,
        profile: state.profile.profile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSinglePost: (type, postId) => {
            return dispatch(fetchSinglePost(type, postId));
        },
        fetchProfile: () => {
            return dispatch(fetchProfile());
        },
        deletePost: (id, callback) => {
            return dispatch(deletePost(id, callback));
        }
    };
}


const SinglePostContainer = connect(mapStateToProps, mapDispatchToProps)(_SinglePostContainer);


export default withRouter(SinglePostContainer);