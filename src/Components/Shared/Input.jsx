import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, TextArea } from 'semantic-ui-react';

export default class SimpleInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isValid: true,
            errorMessage: null,
        };
    }

    static propTypes = {
        type: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        validation: PropTypes.func,
        isValid: PropTypes.bool,
        value: PropTypes.string,
        label: PropTypes.string,
        textArea: PropTypes.string,
        input: PropTypes.bool
    };

    static defaultProps = {
        onChange: () => { },
        onFocus: () => { },
        validation: () => ({
            isValid: true,
            errorMessage: null
        })
    };

    validateInput = () => {
        const { isValid, errorMessage } = this.props.validation(this.props.value || this.state.value);

        this.setState({
            isValid,
            errorMessage
        });

        return isValid;
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ value });

        this.props.onChange(name, value);
    }

    clearError = event => {
        this.setState({
            isValid: true
        });

        this.props.onFocus(event);
    }

    render() {

        const {
            type,
            placeholder,
            name,
            onChange,
            onFocus,
            validation,
            value,
            label,
            textArea,
            input,
            ...rest
        } = this.props;

        return (
            <Form.Field>
                {textArea === 'textArea'
                    && <TextArea
                        autoHeight
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        onChange={this.handleInputChange}
                        onFocus={this.clearError}
                        value={value || this.state.value}
                        label={label}
                        {...rest}
                    />}

                {!textArea
                    && <Form.Input
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        onChange={this.handleInputChange}
                        onFocus={this.clearError}
                        value={value || this.state.value}
                        label={label}
                        {...rest}
                    />}


                {!this.state.isValid
                    && <Message
                        error
                        content={`* ${this.state.errorMessage}`}
                        className='InputError'
                    />}
            </Form.Field>
        );
    }
}