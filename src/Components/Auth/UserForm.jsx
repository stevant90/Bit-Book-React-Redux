import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import AuthLanding from './AuthLanding';
import SimpleForm from '../Shared/Form';
import SimpleInput from '../Shared/Input';
import validator from '../../Util/validator';

export default class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
        };
    }

    static propTypes = {
        handleSubmit: PropTypes.func,
        clearFormStatus: PropTypes.func,
        formMode: PropTypes.string,
        formError: PropTypes.string,
        formSuccess: PropTypes.string,
        isLoading: PropTypes.bool,
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    }

    clearInputs = () => {
        this.setState({
            name: '',
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
        });
    }

    handleSubmit = () => {

        const params = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        };

        this.props.handleSubmit(params);
    }

    render() {

        const {
            handleSubmit,
            clearFormStatus,
            formMode,
            formError,
            formSuccess,
            isLoading
        } = this.props;

        return (
            <AuthLanding
                pageClassName={formMode === 'login' ? 'LoginPage' : 'RegisterPage'}
                className={formMode === 'login' ? 'Login' : 'Register'}
                clearFormStatus={clearFormStatus}
            >

                {formMode === 'login'

                    && <SimpleForm
                        onSubmit={this.handleSubmit}
                        formError={formError}
                        formErrorHeader='Login failed'
                    >

                        <div className='h-textRight h-marginB--lg'>
                            <span className='h-marginR--md'>
                                New here?
                            </span>
                            <Link
                                to='/register'
                                className='ui primary button'
                            >
                                Register
                            </Link>
                        </div>

                        <h2 className='h-marginB--md'>
                            Login
                        </h2>
                        <SimpleInput
                            type='username'
                            placeholder='Email'
                            name='username'
                            onChange={this.handleInputChange}
                            validation={validator.username}

                        />

                        <SimpleInput
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={this.handleInputChange}
                            validation={validator.password}

                        />
                        <Button primary type='submit' loading={isLoading}>
                            Login
                        </Button>
                    </SimpleForm>}

                {formMode === 'register'
                    && <SimpleForm
                        onSubmit={this.handleSubmit}
                        formError={formError}
                        formErrorHeader='Register filed'
                        formSuccessHeader='All signed up!'
                        formSuccess={formSuccess}

                    >

                        <div className='h-textRight h-marginB--lg'>
                            <span className='h-marginR--md'>
                                Already have an account?
                            </span>
                            <Link
                                to='/login'
                                className='ui primary button'
                            >
                                Login
                            </Link>
                        </div>

                        <h2 className='h-marginB--md'>
                            Register
                        </h2>

                        <SimpleInput
                            type='text'
                            placeholder='Name'
                            name='name'
                            onChange={this.handleInputChange}
                            validation={validator.name}

                        />
                        <SimpleInput
                            type='text'
                            placeholder='Username'
                            name='username'
                            onChange={this.handleInputChange}
                            validation={validator.username}

                        />
                        <SimpleInput
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={this.handleInputChange}
                            validation={validator.email}

                        />
                        <SimpleInput
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={this.handleInputChange}
                            validation={validator.password}

                        />
                        <SimpleInput
                            type='password'
                            placeholder='Repeat password'
                            name='repeatPassword'
                            onChange={this.handleInputChange}
                            validation={validator.repeatPassword.bind(null, this.state.password)}

                        />

                        <Button primary type='submit' loading={isLoading}>
                            Register
                        </Button>
                    </SimpleForm>}

            </AuthLanding>
        );
    }
}