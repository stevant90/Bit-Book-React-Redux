import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

export default class SimpleForm extends Component {
    constructor(props) {
        super(props);

        this.fields = [];
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        formError: PropTypes.string,
        formErrorHeader: PropTypes.string,
        children: PropTypes.any,
        formSuccessHeader: PropTypes.string,
        formSuccess: PropTypes.string,
    };

    handleSubmit = () => {
        const fieldsValidState = this.fields.filter(Boolean).map(field => field.validateInput());
        if (fieldsValidState.every(Boolean)) {
            this.props.onSubmit();
            this.fields.map(field => {
                field.state.value = ''
            });
        }
    }

    render() {

        const {
            children,
            onSubmit,
            formError,
            formErrorHeader,
            formSuccessHeader,
            formSuccess,
            ...rest
        } = this.props;

        return (
            <Form
                onSubmit={this.handleSubmit}
                error
                success
                {...rest}
            >

                {children.map(child => {
                    if (!child.type) {
                        return child;
                    }

                    return child.props.input
                        ? { ...child, ref: el => { this.fields.push(el) } }
                        : child;
                })}

                {!!formError
                    && <Message
                        error
                        header={formErrorHeader}
                        content={formError}
                    />}
                {!!formSuccess
                    && <Message
                        success
                        header={formSuccessHeader}
                        content={formSuccess}
                    />}
            </Form>
        );
    }
}