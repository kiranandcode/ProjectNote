import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import env from '../env';

import { Panel, Form, FormControl, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            redirectTo: null,
            errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(target, event) {
        console.log("Setting state " + target);
        this.setState({
            [target]: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.username || this.state.confirmPassword !== this.state.password) {
            let errors = [];
            if(!this.state.username) {
                errors.push('No username provided');
            }
            if(this.state.confirmPassword !== this.state.password) {
                errors.push('Passwords do not match');
            }
            this.setState({
                password: '',
                confirmPassword: '',
                errors
            });
        } else {
        axios.post(env.root + '/auth/signup', { username: this.state.username, password: this.state.password }).then(response => {
            console.log(response);
            if (response.data && !response.data.error) {
                console.log("No problems");
                this.setState({
                    redirectTo: '/login'
                });
            } else if(response.data) {
                this.setState({
                    errors: [JSON.stringify(response.data.error)]
                });
            } else {
                this.setState({
                    errors: ['An unknown error occurred']
                });
            }
        }).catch((err) => {
            this.setState({
                errors: [JSON.stringify(err)]
            })
        });
        }
    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        return (
            <div className="SignupForm container">
                <h1>Signup Form</h1>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={5}>
                            Username
      </Col>
                        <Col md={2}>
                            <FormControl type="text" placeholder="Username" defaultValue={this.state.username} onChange={(event) => {this.handleChange('username', event);}}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={5}>
                            Password
      </Col>

                        <Col md={2}>
                            <FormControl type="password" placeholder="Password" defaultValue={this.state.password} onChange={(event) => {this.handleChange('password', event);}}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={5}>
                            Confirm Password
      </Col>
                        <Col md={2}>
                            <FormControl type="password" placeholder="Password" defaultValue={this.state.confirmPassword} onChange={(event) => {this.handleChange('confirmPassword', event);}}/>
                        </Col>
                    </FormGroup>


                    <FormGroup>
                        <Col smOffset={2} sm={8}>
                            <Button onClick={this.handleSubmit}>
                                Sign up
        </Button>
                        </Col>
                    </FormGroup>
                </Form>

                {
                this.state.errors.length !== 0 && (
                <Panel header={"Sign up errors"} bsStyle="danger">
                    <ul style={{
                        listStyle: 'none'
                    }}>
                        {this.state.errors.map((err) => (
                            <li>
                                <pr>{JSON.stringify(err)}</pr>
                            </li>
                        ))}
                    </ul>
                </Panel>)
                
                /*<label htmlFor="username">Username: </label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />>

                <button onClick={this.handleSubmit}>Sign up</button>*/}

            </div>
        );
    }
}

export default SignupForm;