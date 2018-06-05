import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import NewsFeedList from './NewsFeedList';

class NewsFeedContainer extends Component {


    static propTypes = {
        posts: PropTypes.array,
        fetchPosts: PropTypes.func

    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {

        const { posts } = this.props;

        if (!posts) {
            return <Loader active>Loading</Loader>
        }

        return (
            <div className='FeedPage'>
                {posts.map(post => {       
                   return <NewsFeedList post={post} key={post.id} />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
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