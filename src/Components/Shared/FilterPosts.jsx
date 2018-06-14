import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';

export default class FilterPosts extends Component {

    static propTypes = {
        filter: PropTypes.func
    };

    handleSelect = event => {
        const searchTerm = event.target.value;

        this.props.filter(searchTerm);
    }

    render() {
        return (
            <Form className='FilterPosts h-marginT--xs h-marginL--xs'>
                <Form.Group widths={1}>
                    <Form.Field label='Filter posts' control='select' onChange={this.handleSelect} className='Filter'>
                        <option value=''>All posts</option>
                        <option value='text'>Text</option>
                        <option value='image'>Image</option>
                        <option value='video'>Video</option>
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
} 