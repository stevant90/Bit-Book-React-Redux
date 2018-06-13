import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader, Grid, GridColumn } from 'semantic-ui-react';

import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import TextPostsComponent from './TextPostsComponent';
import ImagePostsComponent from './ImagePostsComponent';
import VideoPostsComponent from './VideoPostsComponent';
import FilterPosts from '../Shared/FilterPosts';

class NewsFeedContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { type: '' };
    }

    static propTypes = {
        posts: PropTypes.array,
        fetchPosts: PropTypes.func,
    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    filterPosts = (searchTerm) => {

        this.setState({ type: searchTerm });
    }

    render() {

        const { posts } = this.props;
        const { type } = this.state;
        let date;

        if (!posts) {
            return <Loader active>Loading</Loader>
        }

        if (posts) {

            posts.map(post => {

                date = post.dateCreated;
            });
        }

        const postDate = new Date(date);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();

        return (
            <Grid className='FeedPage'>
                <Grid.Row className='h-marginT--xs h-marginL--sm FilterPosts__row'>
                    <Grid.Column>
                        <FilterPosts filter={this.filterPosts} />
                    </Grid.Column>

                    <Grid.Column mobile={14} tablet={14} computer={10} className='FeedPage__content'>
                        {posts.map(post => {

                            if (type !== '') {
                                if (type === 'text' && post.type === 'text') {
                                    return (
                                        <TextPostsComponent
                                            post={post}
                                            comments={post.commentsNum}
                                            displayPostDate={displayPostDate}
                                            postTime={postTime}
                                            key={post.id}
                                        />
                                    );
                                } else if (type === 'image' && post.type === 'image') {
                                    return (
                                        <ImagePostsComponent
                                            post={post}
                                            comments={post.commentsNum}
                                            displayPostDate={displayPostDate}
                                            postTime={postTime}
                                            key={post.id}
                                        />
                                    );
                                } else if (type === 'video' && post.type === 'video') {
                                    return (
                                        <VideoPostsComponent
                                            post={post}
                                            comments={post.commentsNum}
                                            displayPostDate={displayPostDate}
                                            postTime={postTime}
                                            key={post.id}
                                            videoUrl={post.videoUrl}
                                        />
                                    );
                                }

                            } else {
                                if (post.type === 'text') {
                                    return (
                                        <TextPostsComponent
                                            post={post}
                                            comments={post.commentsNum}
                                            displayPostDate={displayPostDate}
                                            postTime={postTime}
                                            key={post.id}
                                        />
                                    );
                                } else if (post.type === 'image') {
                                    return (
                                        <ImagePostsComponent
                                            post={post}
                                            comments={post.commentsNum}
                                            displayPostDate={displayPostDate}
                                            postTime={postTime}
                                            key={post.id}
                                        />
                                    );
                                } else if (post.type === 'video') {
                                    return (
                                        <VideoPostsComponent
                                            post={post}
                                            comments={post.commentsNum}
                                            displayPostDate={displayPostDate}
                                            postTime={postTime}
                                            videoUrl={post.videoUrl}
                                            key={post.id}
                                        />
                                    );
                                }
                            }

                        })}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
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