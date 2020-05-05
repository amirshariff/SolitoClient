import React, { Component } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Landing from './components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavigationBar from './utility/NavigationBar';
import Album from './components/Album';
import Photos from './components/Photos';

class App extends Component {
	state = {
		logged_in: localStorage.getItem('token') ? true : false,
		username: ''
	};

	// componentDidMount() {
	// 	if (this.state.logged_in) {
	// 		fetch('http://localhost:8000/api/current_user/', {
	// 			headers: {
	// 				Authorization: `JWT ${localStorage.getItem('token')}`,
	// 			},
	// 		})
	// 			.then((res) => res.json())
	// 			.then((json) => {
	// 				this.setState({ username: json.user});
	// 			});
	// 	}
	// }
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
				localStorage.setItem('token', json.auth_token);
				this.setState({
					logged_in: true,
					// username: json.user.username
				});
				// console.log(this.props)
				this.props.history.push('/albums') 
			}); 
	};

	handle_signup = (e, data) => {
		e.preventDefault();
		fetch('http://localhost:8000/api/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				// console.log(json)
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
				});
				this.props.history.push('/login') 
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token')
		this.setState({ logged_in: false, username: '' });
		this.props.history.push('/login')
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
				<Route exact path="/login" render={() => <Login handle_login={this.handle_login} />} />
				<Route exact path="/signup" render={() => <SignUp handle_signup={this.handle_signup} />} />
				<Route exact path="/albums" component={Album} />
				<Route exact path='/:name/photos' component={Photos} />
				{/* <h3>
					{this.state.logged_in
						? `Hello, ${this.state.username}`
						: 'Please Log In'}
				</h3> */}
			</div>
		);
	}
}
export default App;