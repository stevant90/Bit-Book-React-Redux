import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersContainer from './People/UsersContainer';
import SingleUserContainer from './People/SingleUserContainer';
import ProfileContainer from './Profile/ProfileContainer';

export default class Home extends React.Component {

    render() {

        return (
            <div>
                <Switch>
                    <Route exact path='/people' component={UsersContainer} />
                    <Route path='/profile' component={ProfileContainer} />
                    <Route path='/people/:id' component={SingleUserContainer} />
                </Switch>
            </div>
        );
    }
}