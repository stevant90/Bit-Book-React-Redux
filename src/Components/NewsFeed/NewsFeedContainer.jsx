import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import NewsFeedList from './NewsFeedList';

class NewsFeedContainer extends Component {


    static propTypes = {
        posts: PropTypes.array,
        fetchPosts: PropTypes.func,
        errorMessage: PropTypes.string

    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {

        const { posts, errorMessage } = this.props;

        if (!posts) {
            return <Loader active>Loading</Loader>
        }

        return (
            <div className='FeedPage'>
                {posts.map(post => {
                    return <NewsFeedList post={post} key={post.id} errorMessage={errorMessage} />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        errorMessage: state.posts.errorMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => {
            return dispatch(fetchPosts());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer);