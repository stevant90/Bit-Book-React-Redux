import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';


export default class SearchBar extends Component {

    static propTypes = {
        onSearch: PropTypes.func,
    };

    handleInputChange = (event) => {
        const { value } = event.target;

        this.props.onSearch(value);

    }

    render() {
        return (
            <div className='SearchBar'>
                <Input
                    fluid icon='search'
                    placeholder='Search...'
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}