import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Feed, Icon, Image, Modal } from 'semantic-ui-react';

export default class ImagePostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { open: false }
    }

    static propTypes = {
        post: PropTypes.object,
        displayPostDate: PropTypes.string,
        postTime: PropTypes.string,
        comments: PropTypes.number
    };

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    render() {

        const { post, displayPostDate, postTime, comments } = this.props;
        const { userId, userDisplayName, commentsNum, imageUrl, id } = post;
        const { open } = this.state;

        const displayComments = comments > 1 ? 'Comments' : 'Comment'

        return (
            <div>
                <Segment className='FeedPage__segment'>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Link to={`/people/${userId}`}>{userDisplayName}</Link> posted a image post
                                    <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra images>
                                    <Image size='massive' src={imageUrl} onClick={this.openModal} />
                                </Feed.Extra>
                                <Feed.Meta>
                                    <Feed.Like>
                                        <Icon name='comment' />
                                        {commentsNum} {displayComments}
                                    </Feed.Like>
                                </Feed.Meta>
                                <Link to={`/feed/ImagePosts/${id}`} className='SinglePostLink'>Read more >>></Link>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Segment>
                <Modal size='large' open={open} onClose={this.closeModal}>
                    <Modal.Content>
                        <Image size='massive' src={imageUrl} />
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}   
