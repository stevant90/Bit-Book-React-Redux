import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader, Grid, Icon, Popup } from 'semantic-ui-react';

import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import TextPostsComponent from './TextPostsComponent';
import ImagePostsComponent from './ImagePostsComponent';
import VideoPostsComponent from './VideoPostsComponent';
import FilterPosts from '../Shared/FilterPosts';

class NewsFeedContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: '',
            display: 'none'
        };
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

    backToTop = () => {

        this.setState({ display: 'none' });

        if (window.scrollY > 1000) {
            this.setState({ display: 'block' });
        }
    }

    topOfThePage = () => {
        window.scroll(0, 0);
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

        const backToTopBtn = <Popup
            inverted
            content='Back to top'
            trigger={<Icon onClick={this.topOfThePage} name='arrow circle up' size='huge' color='teal' className='backToTopBtn' style={{ display: this.state.display }} />}
            hideOnScroll
        >
        </Popup>;

        const postDate = new Date(date);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();

        return (
            <Grid className='FeedPage'>
                <Grid.Row className='FeedPage__filter'>
                    <Grid.Column>
                        <FilterPosts filter={this.filterPosts} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column mobile={14} tablet={10} computer={10} className='FeedPage__content'>
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
                {backToTopBtn}
                <InfiniteScroll
                    onScroll={this.backToTop}
                />
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