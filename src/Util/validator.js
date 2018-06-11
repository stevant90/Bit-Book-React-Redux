const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
            isValid: value.length > 0 && value.match(emailRegex),
            errorMessage: value.length > 0 && !value.match(emailRegex) ? 'Please enter valid email address' : 'Please enter email'
        };
    },
    password: value => {
        return {
            isValid: value.length > 0 && value.length > 5,
            errorMessage: value.length < 6 && value.length > 0 ? 'Password must be at least 6 characters long' : 'Please enter password'
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
            isValid: value.length > 0 && value.match(urlRegex),
            errorMessage: value.length > 0 && !value.match(urlRegex) ? 'Please enter valid url' : 'Please enter url'
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
    text: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'This field can\'t be empty'
        };
    },
    comment: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'Comment can\'t be empty'
        };
    },
    required: value => {
        return {
            isValid: value.length > 0,
            errorMessage: 'This field is required'
        };
    }
};