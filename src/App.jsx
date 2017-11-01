import axios from 'axios';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import env from './env';

import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Home from './components/Home';
import Project from './components/Project/Project';
import NewProjectForm from './components/Project/NewProjectForm';
import Manage from './components/Project/Manage';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


const DisplayLinks = props => {
	if(props.loggedIn) {
		return (
			<Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Project Note</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
		<Link to="/" className="nav-link">
        <NavItem eventKey={1}>
				Home
		</NavItem>
			</Link>
      </Nav>
      <Nav pullRight>
			<Link to="#" className="nav-link" onClick={props._logout}>
        <NavItem eventKey={1}>
								Logout
		</NavItem>
		</Link>	
      </Nav>
    </Navbar.Collapse>
  </Navbar>
			
		);
	} else {
		return (
			<Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Project Note</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}>
			<Link to="/" className="nav-link">
				Home
			</Link>
		</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1}>
			<Link to="/login" className="nav-link">
							Login
						</Link>
		</NavItem>
		<NavItem eventKey={2}>
		<Link to="/signup" className="nav-link">
							Sign up	
					</Link>
		</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
			
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
		axios.get(env.root + '/auth/user').then(response => {
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


		axios.post(env.root + '/auth/logout').then(response => {
			console.log(response.data);
			if(response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}


	_login(username, password) {
		console.log("Login called");
		axios.post(env.root + '/auth/login', { username, password }).then(response => {
			console.log(response);
			console.log("login");
			if(response.status === 200) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			}
		}).catch((err ) => {
			console.log("error");
			console.log(err);
		});
	}

	render() {
		return (
			<div className="App">

				<DisplayLinks user={this.state.user} _logout={this._logout} loggedIn={this.state.loggedIn}/>

				<Route exact path="/" render={() => <Home user={this.state.user}/>}/>
				<Route exact path="/login" render={() => 
					<LoginForm
					_login={this._login}
					_googleSignin={this._googleSignin}/>
				}/>
				<Route path="/project/new" render={() => <NewProjectForm user={this.state.user}/>}/>
				<Route path="/project/view/:id" render={(props) => 
					<Project user={this.state.user} 
							project_id={props.match.params.id}/>
				}/>
				<Route path="/project/manage/:id" render={(props) => 
					<Manage user={this.state.user} 
							project_id={props.match.params.id}/>
				}/>



				<Route exact path="/signup" component={SignupForm}/>
			</div>
		);
	}
	
}


export default App;