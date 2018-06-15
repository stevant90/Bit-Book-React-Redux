import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

export default class PageWrapper extends Component {

    static propTypes = {
        children: PropTypes.any,
        pageClassName: PropTypes.string,
        className: this.propTypes.string
    };

    render() {

        const { children, pageClassName, className } = this.props;

        return (
            <main
                className={pageClassName}
            >
                <Grid>
                    <div
                        className={className}
                    >
                        {children}
                    </div>
                </Grid>
            </main>
        );
    }
} 