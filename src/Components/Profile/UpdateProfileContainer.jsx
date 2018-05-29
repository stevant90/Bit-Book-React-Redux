import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { updateProfile } from '../../Redux/actions/profile/updateProfile';
import { fetchProfile } from '../../Redux/actions/profile/profile';
import { clearFormStatus } from '../../Redux/actions/clearFormStatus';
import UpdateProfile from './UpdateProfile';

class UpdateProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { open: false };
    }

    static propTypes = {
        updateProfile: PropTypes.func,
        errorMessage: PropTypes.string,
        isLoading: PropTypes.bool,
        clearFormStatus: PropTypes.func,
        fetchProfile: PropTypes.func,
        profile: PropTypes.object,
    };

    show = dimmer => () => {
        this.setState({ dimmer, open: true });
    }

    close = () => {
        this.setState({ open: false });
    }

    render() {

        const {
            updateProfile,
            errorMessage,
            isLoading,
            clearFormStatus,
            fetchProfile,
            profile,
        } = this.props;

        const { open, dimmer } = this.state;

        return (
            <div className='h-textCenter'>
                <Button primary onClick={this.show(true)} ><Icon name='edit' size='large' />Update profile</Button>
                <UpdateProfile
                    updateProfile={updateProfile}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    open={open}
                    dimmer={dimmer}
                    close={this.close}
                    clearFormStatus={clearFormStatus}
                    refreshProfile={fetchProfile}
                    profile={profile}

                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.updateProfile.errorMessage,
        isLoading: state.updateProfile.isLoading,
        profile: state.profile.profile,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (params, callback) => {
            return dispatch(updateProfile(params, callback));
        },
        fetchProfile: () => {
            return dispatch(fetchProfile());
        },
        clearFormStatus: () => {
            return dispatch(clearFormStatus());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileContainer);