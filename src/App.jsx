import axios from 'axios';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Home from './components/Home';


const DisplayLinks = props => {
	if(props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-link" onClick={props._logout}>
								Logout
							</Link>
						</li> 
				</ul>
			</nav>
		);
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Login
						</Link>
					</li>

					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							Sign up	
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
};


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			user: null
		};

		this._logout = this._logout.bind(this);
		this._login = this._login.bind(this);
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data);

			if(response.data.user) {
				console.log("USER FOUND");

				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		})
	}


	_logout(event) {
		event.preventDefault();

		console.log("Logging out");

		// TODO: Implement Logging out
	}


	_login(username, password) {
		// TODO: implemnent Logging in
	}

	render() {
		return (
			<div className="App">
				<h1>Project Note</h1>
				<Header user={this.state.user}/>
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn}/>


				<Route exact path="/" render={() => <Home user={this.state.user}/>}/>
				<Route exact path="/login" render={() => 
					<LoginForm
					_login={this._login}
					_googleSignin={this._googleSignin}/>
				}/>

				<Route exact path="/signup" component={SignupForm}/>
			</div>
		);
	}
	
}


export default App;