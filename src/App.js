import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import PicCard from './components/PicCard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import NavigationBar from './utility/NavigationBar';

class App extends Component {
	state = {
		logged_in: localStorage.getItem('token') ? true : false,
		username: '',
	};

	componentDidMount() {
		if (this.state.logged_in) {
			fetch('http://localhost:8000/core/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`,
				},
			})
				.then((res) => res.json())
				.then((json) => {
					this.setState({ username: json.username });
				});
		}
	}

	handle_login = (e, data) => {
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
				console.log(json);
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					// username: json.user
				});
			});
	};

	handle_signup = (e, data) => {
		e.preventDefault();
		fetch('http://localhost:8000/core/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
				});
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ logged_in: false, username: '' });
	};

	render() {
		return (
			<div>
				<NavigationBar
					logged_in={this.state.logged_in}
					display_form={this.display_form}
					handle_logout={this.handle_logout}
				/>
				<Route exact path="/" component={Landing} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/home" component={PicCard} />
				<h3>
					{this.state.logged_in
						? `Hello, ${this.state.username}`
						: 'Please Log In'}
				</h3>
			</div>
		);
	}
}

export default App;
