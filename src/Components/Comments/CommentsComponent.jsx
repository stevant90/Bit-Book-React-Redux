import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Comment, Grid, Segment, Item, Message } from 'semantic-ui-react';

export default class CommentsComponent extends Component {

    static propTypes = {
        comment: PropTypes.object,
    };

    render() {

        const { comment } = this.props;

        const { authorName, dateCreated, body, authorId } = comment;

        const date = new Date(dateCreated);
        const displayDate = date.toDateString();
        const displayTime = date.toLocaleTimeString();

        return (
            <Grid stackable className='h-marginT--xxl'>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Grid.Row>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Content>
                                            <Comment.Author><Link to={`/people/${authorId}`}>{authorName}</Link></Comment.Author>
                                            <Comment.Metadata>
                                                <div>On {displayDate}, {displayTime}</div>
                                            </Comment.Metadata>
                                            <Comment.Text>
                                                {body}
                                            </Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Row>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid>
        );
    }
}