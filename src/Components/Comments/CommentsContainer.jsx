import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchComments } from '../../Redux/actions/comments/comments';
import { newComment } from '../../Redux/actions/comments/newComment'
import { clearFormStatus } from '../../Redux/actions/clearFormStatus';
import CommentsComponent from './CommentsComponent';
import CommentsForm from './CommentsForm';

class CommentsContainer extends Component {

    static propTypes = {
        comments: PropTypes.array,
        fetchComments: PropTypes.func,
        postId: PropTypes.string,
        newCommentError: PropTypes.string,
        clearFormStatus: PropTypes.func,
        newComment: PropTypes.func,
        isLoading: PropTypes.bool
    };

    loadComments = () => {

        const { postId } = this.props;

        this.props.fetchComments(postId);
    }

    componentDidMount() {

        this.loadComments();
    }


    render() {

        const {
            comments,
            newComment,
            clearFormStatus,
            newCommentError,
            postId,
            isLoading } = this.props;       

        return (
            <div className='Comments'>
                <CommentsForm
                    newComment={newComment}
                    clearFormStatus={clearFormStatus}
                    newCommentError={newCommentError}
                    postId={postId}
                    loadComments={this.loadComments}
                    isLoading={isLoading}
                />
                {comments.map(comment => {
                    return <CommentsComponent comment={comment} key={comment.id} />
                })}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.comments.comments,
        newCommentError: state.newComment.errorMessage,
        isLoading: state.newComment.isLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: postId => {
            dispatch(fetchComments(postId));
        },
        newComment: (postId, callback) => {
            dispatch(newComment(postId, callback));
        },
        clearFormStatus: () => {
            dispatch(clearFormStatus());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);