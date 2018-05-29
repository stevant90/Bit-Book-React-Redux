export default {
    name: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'Please enter name'
        };
    },
    username: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'Please enter username'
        };
    },
    email: value => {
        return {
            isValid: value.length > 0 && value.includes('@'),
            errorMessage: 'Please enter valid email address'
        };
    },
    password: value => {
        return {
            isValid: value.length > 0 && value.length > 5,
            errorMessage: value.length < 6  && value.length > 0 ?'Password must be at least 6 characters long' : 'Please enter password'
        };
    },
    repeatPassword: (password, value) => {
        return {
            isValid: value === password,
            errorMessage: 'Passwords dont match'
        };
    },
    avatarUrl: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'Please enter image url'
        };
    },
    aboutShort: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'Please enter something short about you'
        };
    },
    about: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'Please enter something about you'
        };
    },
    required: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'This field is required'
        };
    }
};