import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Segment, Feed, Icon, Button, Popup, Message } from 'semantic-ui-react';


export default class SingleTextPost extends Component {

    static propTypes = {
        post: PropTypes.object,
        deletePost: PropTypes.func,
        deleteErrorMessage: PropTypes.string,
        ownId: PropTypes.number
    };

    delete = () => {
        const { id } = this.props.post;

        this.props.deletePost(id);

    }


    render() {

        const { post, ownId, deleteErrorMessage } = this.props;
        const { text, userDisplayName, userId, dateCreated, commentsNum } = post;

        const postDate = new Date(dateCreated);
        const displayPostDate = postDate.toDateString();
        const postTime = postDate.toLocaleTimeString();
        const displayComments = commentsNum > 1 ? 'Comments' : 'Comment'


        let deleteBtn = ownId === userId ? <Popup trigger={<Button onClick={this.delete} color='red' icon='trash' />} content='Delete' inverted /> : '';

        return (
            <div className='h-marginT--md'>
                <Link to='/' className='h-paddingALL--sm'><Icon name='angle double left' size='large' />Go back</Link>
                <Grid stackable>
                    <Segment className='SinglePost'>
                        <Grid.Row>
                            {deleteBtn}
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
                                        </Feed.Summary>
                                        <Feed.Extra text className='h-textRight'>
                                            {text}
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