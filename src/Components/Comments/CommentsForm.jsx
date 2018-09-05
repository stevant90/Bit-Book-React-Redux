import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import SimpleForm from '../Shared/Form';
import SimpleInput from '../Shared/Input';
import validator from '../../Util/validator';

export default class CommentsForm extends Component {
    constructor(props) {
        super(props);

        this.state = { comment: '' };
    }

    static propTypes = {
        newComment: PropTypes.func,
        clearFormStatus: PropTypes.func,
        newCommentError: PropTypes.string,
        postId: PropTypes.string,
        loadComments: PropTypes.func,
        isLoading: PropTypes.bool
    };

    handleInputChange = (name, value) => {

        this.setState({ [name]: value });
    }

    handleSubmit = () => {

        const { comment } = this.state;
        const { postId } = this.props;
        const { loadComments } = this.props;

        const data = {
            body: comment,
            postId
        };

        this.props.newComment(data, loadComments);

        this.props.clearFormStatus();
    }

    render() {

        const { newComment, clearFormStatus, newCommentError, isLoading } = this.props;

        return (
            <div className='h-marginT--xxl'>
                <SimpleForm
                    onSubmit={this.handleSubmit}
                    formError={newCommentError}
                    formErrorHeader='Something went wrong!'
                >
                    <SimpleInput
                        input
                        type='text'
                        placeholder='Enter comment'
                        textArea='textArea'
                        name='comment'
                        onChange={this.handleInputChange}
                        validation={validator.comment}
                    />

                    <Button
                        content='Add Comment'
                        labelPosition='left'
                        icon='edit'
                        type='submit'
                        primary
                        loading={isLoading}
                    />
                </SimpleForm>
            </div>
        );
    }
}