import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSinglePost } from '../../Redux/actions/newsFeed/singlePost';
import SingleTextPost from './SingleTextPost';
import SingleImagePost from './SingleImagePost';
import SingleVideoPost from './SingleVideoPost';

class singlePostContainer extends Component {

    static propTypes = {
        fetchSinglePost: PropTypes.func,
        type: PropTypes.string,
        postId: PropTypes.string,
        match: PropTypes.object,
        singlePost: PropTypes.object,
        errorMessage: PropTypes.string
    };

    componentDidMount() {
        const { type } = this.props.match.params;
        const { postId } = this.props.match.params;

        this.props.fetchSinglePost(type, postId);

    }

    render() {

        const { singlePost, errorMessage } = this.props;

        if (singlePost.type === 'text') {
            return (
                <div className='SinglePostPage'>
                    <SingleTextPost post={singlePost} errorMessage={errorMessage} />
                </div>
            );
        }

        if (singlePost.type === 'image') {
            return (
                <div>
                    <SingleImagePost post={singlePost} errorMessage={errorMessage} />
                </div>
            );
        }

        return (
            <div>
                <SingleVideoPost post={singlePost} errorMessage={errorMessage} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        singlePost: state.singlePost.post,
        errorMessage: state.singlePost.errorMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSinglePost: (type, postId) => {
            return dispatch(fetchSinglePost(type, postId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(singlePostContainer);