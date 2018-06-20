import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppContainer from './Components/AppContainer';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import UsersContainer from './Components/People/UsersContainer';
import SingleUserContainer from './Components/People/SingleUserContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import NewsFeedContainer from './Components/NewsFeed/NewsFeedContainer';
import SinglePostContainer from './Components/NewsFeed/SinglePostContainer';

export default class Routes extends Component {

	render() {
		return (
			<div className='MainPage'>
				<HashRouter>
					<Switch>

						<Route path='/login'>
							<AppContainer
								Component={Login}
								requiresLogin={false}
								hasHeaderAndFooter={false}
							/>
						</Route>

						<Route path='/register'>
							<AppContainer
								Component={Register}
								requiresLogin={false}
								hasHeaderAndFooter={false}
							/>
						</Route>

						<Route exact path='/'>
							<AppContainer Component={NewsFeedContainer} />
						</Route>

						<Route path='/feed/:type/:postId'>
							<AppContainer Component={SinglePostContainer} />
						</Route>

						<Route exact path='/people'>
							<AppContainer Component={UsersContainer} />
						</Route>

						<Route path='/people/:id'>
							<AppContainer Component={SingleUserContainer} />
						</Route>

						<Route path='/profile'>
							<AppContainer Component={ProfileContainer} />
						</Route>

					</Switch>
				</HashRouter>
			</div>
		);
	}
}

