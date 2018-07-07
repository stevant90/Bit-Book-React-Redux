import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader, Icon, Popup } from 'semantic-ui-react';

import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import TextPostsComponent from './TextPostsComponent';
import ImagePostsComponent from './ImagePostsComponent';
import VideoPostsComponent from './VideoPostsComponent';
import FilterPosts from '../Shared/FilterPosts';

export class NewsFeedContainer extends Component {
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
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }


    render() {

        const { posts } = this.props;
        const { type } = this.state;
        let date;

        if (!posts) {
            return <Loader active>Loading</Loader>
        }

        posts.map(post => {

            date = post.dateCreated
        });

        const postDate = new Date(date);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();

        const backToTopBtn = <Popup
            inverted
            content='Back to top'
            trigger={<Icon onClick={this.topOfThePage} name='arrow circle up' size='huge' color='teal' className='backToTopBtn' style={{ display: this.state.display }} />}
            hideOnScroll
        >
        </Popup>;


        return (

            <div className='FeedPage'>

                <div className='FeedPage__filter'>
                    <FilterPosts filter={this.filterPosts} />
                </div>

                <div className='FeedPage__content'>

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

                    {backToTopBtn}
                    <InfiniteScroll
                        onScroll={this.backToTop}
                    />
                </div>
            </div>
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