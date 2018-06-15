import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { fetchSingleUser } from '../../Redux/actions/people/singleUser';
import { fetchProfile } from '../../Redux/actions/profile/profile';
import SingleUser from './SingleUser';
import UpdateProfileContainer from '../Profile/UpdateProfileContainer';

class SingleUserContainer extends Component {

    static propTypes = {
        user: PropTypes.object,
        fetchSingleUser: PropTypes.func,
        match: PropTypes.object,
        errorMessage: PropTypes.string,
        fetchProfile: PropTypes.func,
        profile: PropTypes.object
    };

    componentDidMount() {
        const userId = this.props.match.params.id;

        this.props.fetchSingleUser(userId);
        this.props.fetchProfile();
    }

    renderUpdateProfile = Component => {
        const { user, profile } = this.props;
        let userId = user.userId;
        let ownId = profile.userId;

        if (ownId === userId && ownId !== undefined) {
            return <Component />
        }
    }

    render() {

        const { user, errorMessage, profile } = this.props;

        return (
            <Grid>
                {<SingleUser user={user} errorMessage={errorMessage} />}
                <Grid.Row>
                    <Grid.Column className='SingleUser__updateProfile'>
                        {this.renderUpdateProfile(UpdateProfileContainer)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.singleUser.user,
        errorMessage: state.singleUser.errorMessage,
        profile: state.profile.profile
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleUser: id => {
            return dispatch(fetchSingleUser(id));
        },
        fetchProfile: () => {
            return dispatch(fetchProfile());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserContainer);