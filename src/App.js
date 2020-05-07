import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavigationBar from './utility/NavigationBar';
import AlbumCollection from './components/AlbumCollection';
import Album from './components/Album';
import NotFound404 from './utility/NotFound404';

class App extends Component {
	state = {
		user: null,
	};

	componentDidMount() {
		if (localStorage.getItem('token')) this.validateToken();
	}

	handleLogin = (e, data) => {
		e.preventDefault();
		fetch('http://127.0.0.1:8000/api/auth/token/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				localStorage.setItem('token', json.auth_token);
				this.validateToken();
			});
		this.props.history.push('/albums');
	};

	handleSignup = (e, data) => {
		e.preventDefault();
		fetch('http://localhost:8000/api/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => this.props.history.push('/login'));
	};

	validateToken = () => {
		fetch('http://localhost:8000/api/current_user/', {
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ user: json });
				// this.props.history.push('/albums');
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ user: null });
		this.props.history.push('/login');
	};

	render() {
		return (
			<div>
				<NavigationBar
					user={this.state.user}
					display_form={this.display_form}
					handle_logout={this.handle_logout}
				/>
				<Route exact path="/" component={Landing} />
				<Route
					exact
					path="/login"
					render={() => <Login handleLogin={this.handleLogin} />}
				/>
				<Route
					exact
					path="/signup"
					render={() => <SignUp handleSignup={this.handleSignup} />}
				/>
				<Route
					exact
					path="/albums"
					render={(routerProps) => (
						<AlbumCollection {...routerProps} user={this.state.user} />
					)}
				/>
				<Route
					exact
					path="/a/:albumId"
					render={(routerProps) => (
						<Album {...routerProps} user={this.state.user} />
					)}
				/>
				<Route
					exact
					path="/404"
					render={(routerProps) => <NotFound404 {...routerProps} />}
				/>
			</div>
		);
	}
}
export default App;
