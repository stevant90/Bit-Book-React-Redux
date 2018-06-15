import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader, Grid, Icon, Popup, Segment, Feed, Image } from 'semantic-ui-react';

import { fetchPosts } from '../../Redux/actions/newsFeed/posts';
import TextPostsComponent from './TextPostsComponent';
import ImagePostsComponent from './ImagePostsComponent';
import VideoPostsComponent from './VideoPostsComponent';
import FilterPosts from '../Shared/FilterPosts';

class NewsFeedContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postType: '',
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

        this.setState({ postType: searchTerm });
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

    displayContent = () => {

        const { posts } = this.props;
        const { postType } = this.state;

        return posts.map(post => {
            let { userId, dateCreated, userDisplayName, commentsNum, text, id, videoUrl, imageUrl, type } = post;


            const postDate = new Date(dateCreated);
            const displayPostDate = postDate.toDateString();
            const postTime = postDate.toLocaleTimeString();
            const displayComments = commentsNum > 1 ? 'Comments' : 'Comment'


            let youTubeVideoUrl;

            const rootEmbedUrl = 'https://www.youtube.com/embed/';
            const partOfUrl = 'https://youtu.be/';
            const listUrl = '&list='

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

            if (text !== undefined || imageUrl !== undefined || videoUrl !== undefined) {

                return <Segment className='FeedPage__segment' key={id}>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Link to={`/people/${userId}`}>{userDisplayName}</Link> posted a text post
                            <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                                </Feed.Summary>

                                {postType !== ''
                                    && <Feed.Extra>
                                        {postType === 'text' && <p>{text}</p>}
                                        {postType === 'image' && <Image size='massive' src={imageUrl} />} 
                                        {postType === 'video'
                                            && <Iframe
                                                url={`https://www.youtube.com/embed/${youTubeVideoUrl}`}
                                                display="initial"
                                                position="relative"
                                                allowFullScreen
                                                height='300px'
                                            />}
                                    </Feed.Extra>}

                                {postType === ''
                                    && <Feed.Extra>
                                        {type === 'text' && <p>{text}</p>}
                                        {type === 'image' && <Image size='massive' src={imageUrl} />}
                                        {type === 'video'
                                            && <Iframe
                                                url={`https://www.youtube.com/embed/${youTubeVideoUrl}`}
                                                display="initial"
                                                position="relative"
                                                allowFullScreen
                                                height='300px'
                                            />}
                                    </Feed.Extra>}
                                <Feed.Meta>
                                    <Feed.Like>
                                        <Icon name='comment' />
                                        {commentsNum} {displayComments}
                                    </Feed.Like>
                                </Feed.Meta>
                                <Link to={`/feed/TextPosts/${id}`} className='SinglePostLink'>Read more >>></Link>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Segment>
            }
        })
    }


    render() {

        const { posts } = this.props;
        const { postType } = this.state;
        console.log(postType);


        if (!posts) {
            return <Loader active>Loading</Loader>
        }

        const backToTopBtn = <Popup
            inverted
            content='Back to top'
            trigger={<Icon onClick={this.topOfThePage} name='arrow circle up' size='huge' color='teal' className='backToTopBtn' style={{ display: this.state.display }} />}
            hideOnScroll
        >
        </Popup>;


        return (
            <div>
                <FilterPosts filter={this.filterPosts} />
                {this.displayContent()}
                {backToTopBtn}
                <InfiniteScroll
                    onScroll={this.backToTop}
                />
            </div>
            // <Grid className='FeedPage'>
            //     <Grid.Row className='FeedPage__filter'>
            //         <Grid.Column>
            //             <FilterPosts filter={this.filterPosts} />
            //         </Grid.Column>
            //     </Grid.Row>

            //     <Grid.Row>
            //         <Grid.Column mobile={14} tablet={10} computer={10} className='FeedPage__content'>
            //             {posts.map(post => {

            //                 if (type !== '') {
            //                     if (type === 'text' && post.type === 'text') {
            //                         return (
            //                             <TextPostsComponent
            //                                 post={post}
            //                                 comments={post.commentsNum}
            //                                 displayPostDate={displayPostDate}
            //                                 postTime={postTime}
            //                                 key={post.id}
            //                             />
            //                         );
            //                     } else if (type === 'image' && post.type === 'image') {
            //                         return (
            //                             <ImagePostsComponent
            //                                 post={post}
            //                                 comments={post.commentsNum}
            //                                 displayPostDate={displayPostDate}
            //                                 postTime={postTime}
            //                                 key={post.id}
            //                             />
            //                         );
            //                     } else if (type === 'video' && post.type === 'video') {
            //                         return (
            //                             <VideoPostsComponent
            //                                 post={post}
            //                                 comments={post.commentsNum}
            //                                 displayPostDate={displayPostDate}
            //                                 postTime={postTime}
            //                                 key={post.id}
            //                                 videoUrl={post.videoUrl}
            //                             />
            //                         );
            //                     }

            //                 } else {
            //                     if (post.type === 'text') {
            //                         return (
            //                             <TextPostsComponent
            //                                 post={post}
            //                                 comments={post.commentsNum}
            //                                 displayPostDate={displayPostDate}
            //                                 postTime={postTime}
            //                                 key={post.id}
            //                             />
            //                         );
            //                     } else if (post.type === 'image') {
            //                         return (
            //                             <ImagePostsComponent
            //                                 post={post}
            //                                 comments={post.commentsNum}
            //                                 displayPostDate={displayPostDate}
            //                                 postTime={postTime}
            //                                 key={post.id}
            //                             />
            //                         );
            //                     } else if (post.type === 'video') {
            //                         return (
            //                             <VideoPostsComponent
            //                                 post={post}
            //                                 comments={post.commentsNum}
            //                                 displayPostDate={displayPostDate}
            //                                 postTime={postTime}
            //                                 videoUrl={post.videoUrl}
            //                                 key={post.id}
            //                             />
            //                         );
            //                     }
            //                 }

            //             })}
            //         </Grid.Column>
            //     </Grid.Row>

            // </Grid>
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