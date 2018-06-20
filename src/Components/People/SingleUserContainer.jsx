import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { fetchSingleUser } from '../../Redux/actions/people/singleUser';
import { fetchProfile } from '../../Redux/actions/profile/profile';
import SingleUser from './SingleUser';
import UpdateProfileContainer from '../Profile/UpdateProfileContainer';

class _SingleUserContainer extends Component {

    static propTypes = {
        user: PropTypes.object,
        fetchSingleUser: PropTypes.func,
        match: PropTypes.object,
        errorMessage: PropTypes.string,
        fetchProfile: PropTypes.func,
        profile: PropTypes.object
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchSingleUser(id);
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

const SingleUserContainer = connect(mapStateToProps, mapDispatchToProps)(_SingleUserContainer);

export default withRouter(SingleUserContainer);