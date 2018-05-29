import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProfile } from '../../Redux/actions/profile/profile';
import Profile from './Profile';

class ProfileContainer extends Component {

    static propTypes = {
        profile: PropTypes.object,
        errorMessage: PropTypes.string,
        fetchProfile: PropTypes.func
    };

    componentDidMount() {
        this.props.fetchProfile();
    }

    render() {

        const { profile, errorMessage } = this.props;

        return <Profile profile={profile} errorMessage={errorMessage} />
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        errorMessage: state.profile.errorMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => {
            return dispatch(fetchProfile());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);