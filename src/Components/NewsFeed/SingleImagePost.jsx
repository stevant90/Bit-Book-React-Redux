import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Segment, Image, Icon, Feed, Button, Popup, Message } from 'semantic-ui-react';

export default class SingleImagePost extends Component {

    static propTypes = {
        post: PropTypes.object,
        deletePost: PropTypes.func,
        deleteErrorMessage: PropTypes.string,
        ownId: PropTypes.number,
    };

    delete = () => {
        const { id } = this.props.post;

        this.props.deletePost(id);
    }

    render() {

        const { post, ownId, deleteErrorMessage } = this.props;
        const { userId, userDisplayName, dateCreated, commentsNum, imageUrl } = post;

        const postDate = new Date(dateCreated);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();
        const displayComments = commentsNum > 1 ? 'Comments' : 'Comment'

        let deleteBtn = ownId === userId ? <Popup trigger={<Button onClick={this.delete} color='red' icon='trash' />} content='Delete' inverted /> : '';

        return (
            <div className='h-marginT--md'>
                <Link to='/' className='h-paddingALL--sm'><Icon name='arrow circle left' size='large' />Go back</Link>
                <Grid stackable>
                    <Segment className='SinglePost__segment'>
                        <Grid.Row>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        {!!deleteErrorMessage
                                            && <Message
                                                error
                                                content={deleteErrorMessage}
                                            />}
                                        <Feed.Summary>
                                            <Link to={`/people/${userId}`}>{userDisplayName}</Link>
                                            <Feed.Date> at: {displayPostDate} in: {postTime}</Feed.Date>
                                            <span style={{float: 'right'}} className='h-marginB--sm'>{deleteBtn}</span>                                            
                                        </Feed.Summary>
                                        <Feed.Extra images>
                                            <Image size='massive' src={imageUrl} />
                                        </Feed.Extra>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='comment' />
                                                {commentsNum} {displayComments}
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Row>
                    </Segment>
                </Grid>
            </div>
        );
    }
}