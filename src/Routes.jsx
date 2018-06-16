import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppContainer from './Components/AppContainer';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import Home from './Components/Home';

export default class Routes extends Component {

	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
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

						<Route path='/'>
							<AppContainer Component={Home} />
						</Route>
				
					</Switch>
				</HashRouter>
			</div>
		);
	}
}

