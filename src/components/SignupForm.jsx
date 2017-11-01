import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import env from '../env';

import { Form, FormControl, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        axios.post(env.root + '/auth/signup', { username: this.state.username, password: this.state.password }).then(response => {
            console.log(response);
            if (!response.data.errmsg) {
                console.log("No problems");
                this.setState({
                    redirectTo: '/login'
                });
            } else {
                console.log('duplicate');
            }
        });

    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        return (
            <div className="SignupForm">
                <h1>Signup Form</h1>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={5}>
                            Username
      </Col>
                        <Col md={2}>
                            <FormControl type="text" placeholder="Username" defaultValue={this.state.username} onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={5}>
                            Password
      </Col>
                        <Col md={2}>
                            <FormControl type="password" placeholder="Password" defaultValue={this.state.password} onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={5}>
                            Confirm Password
      </Col>
                        <Col md={2}>
                            <FormControl type="password" placeholder="Password" defaultValue={this.state.confirmPassword} onChange={this.handleChange}/>
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
                {/*<label htmlFor="username">Username: </label>
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