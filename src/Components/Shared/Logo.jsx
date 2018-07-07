import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

const Logo = props => {
    return (
        <div className='Logo h-text-center h-marginB--sm'>
            <span className='Logo__inner'>
                <Icon name='book' size='large' />
                my Book
            </span>
        </div>
    );
}

export default Logo;