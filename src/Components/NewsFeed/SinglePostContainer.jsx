import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchSinglePost } from '../../Redux/actions/newsFeed/singlePost';
import { fetchProfile } from '../../Redux/actions/profile/profile';
import { deletePost } from '../../Redux/actions/newsFeed/deletePost';
import SingleTextPost from './SingleTextPost';
import SingleImagePost from './SingleImagePost';
import SingleVideoPost from './SingleVideoPost';
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

    delete = (id) => {

        this.props.deletePost(id, this.refreshPage);

    }

    render() {

        const { singlePost, deletePost, deleteErrorMessage, profile } = this.props;

        let { postId } = this.props.match.params;

        let ownId;

        if (profile) {
            ownId = profile.userId
        }

        if (singlePost.type === 'text') {
            return (
                <div>
                    <SingleTextPost
                        post={singlePost}
                        deletePost={this.delete}
                        deleteErrorMessage={deleteErrorMessage}
                        ownId={ownId}
                    />
                    <CommentsContainer postId={postId} />
                </div>
            );
        }

        if (singlePost.type === 'image') {
            return (
                <div>
                    <SingleImagePost
                        post={singlePost}
                        deletePost={this.delete}
                        deleteErrorMessage={deleteErrorMessage}
                        ownId={ownId}
                    />
                    <CommentsContainer postId={postId} />
                </div>
            );
        }

        return (
            <div>
                <SingleVideoPost
                    post={singlePost}
                    deletePost={this.delete}
                    deleteErrorMessage={deleteErrorMessage}
                    ownId={ownId}
                />
                <CommentsContainer postId={postId} />
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