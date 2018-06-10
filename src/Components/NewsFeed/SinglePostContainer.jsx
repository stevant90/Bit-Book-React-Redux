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

class _SinglePostContainer extends Component {

    static propTypes = {
        fetchSinglePost: PropTypes.func,
        type: PropTypes.string,
        postId: PropTypes.string,
        match: PropTypes.object,
        singlePost: PropTypes.object,
        errorMessage: PropTypes.string,
        fetchProfile: PropTypes.func,
        deletePost: PropTypes.func,
        deleteErrorMessage: PropTypes.string,
        profile: PropTypes.object,
        history: PropTypes.object
    };

    componentDidMount() {
        const { type } = this.props.match.params;
        const { postId } = this.props.match.params;

        this.props.fetchSinglePost(type, postId);

        this.props.fetchProfile();

    }

    refreshPage = () => {
        this.props.history.replace('/');
    }

    delete = (id) => {
        this.props.deletePost(id, this.refreshPage);

    }

    render() {

        const { singlePost, errorMessage, deletePost, deleteErrorMessage, profile } = this.props;

        let ownId;

        if (profile) {
            ownId = profile.userId
        }

        if (singlePost.type === 'text') {
            return (
                <div className='SinglePostPage'>
                    <SingleTextPost
                        post={singlePost}
                        errorMessage={errorMessage}
                        deletePost={this.delete}
                        deleteErrorMessage={deleteErrorMessage}
                        ownId={ownId}


                    />
                </div>
            );
        }

        if (singlePost.type === 'image') {
            return (
                <div>
                    <SingleImagePost
                        post={singlePost}
                        errorMessage={errorMessage}
                        deletePost={this.delete}
                        deleteErrorMessage={deleteErrorMessage}
                        ownId={ownId}

                    />
                </div>
            );
        }

        return (
            <div>
                <SingleVideoPost
                    post={singlePost}
                    errorMessage={errorMessage}
                    deletePost={this.delete}
                    deleteErrorMessage={deleteErrorMessage}
                    ownId={ownId}

                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        singlePost: state.singlePost.post,
        errorMessage: state.singlePost.errorMessage,
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