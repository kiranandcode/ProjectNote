import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import googleButton from './btn_google_signin_dark_normal_web.png';
import env from '../../env';

import { ListGroup, Grid, Row } from 'react-bootstrap';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }


    handleChangeUsername(event) {
        console.log(JSON.stringify(Object.keys(event.target)));
        console.log(JSON.stringify(event.target.value));

        this.setState({
            username: event.target.value
        });
    }

    handleChangePassword(event) {
        console.log(JSON.stringify(Object.keys(event.target)));
        console.log(JSON.stringify(event.target.value));

        this.setState({
            password: event.target.value
        });
    }



    handleSubmit(event) {
        event.preventDefault();
        // console.log(event);
        this.props._login(this.state.username, this.state.password)
        this.setState({
            redirectTo: '/'
        });
    }




    render() {

        if (this.state.redirectTo) {
            return (<Redirect to={{ pathname: this.state.redirectTo }} />);
        } else {
            return (
                <div className="LoginForm">
                    <h1>Login Form</h1>

                    {/*<ListGroup componentClass="ul">
                        <CustomComponent style={{width: "200px"}}>
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                        </CustomComponent>
                        <CustomComponent>
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </CustomComponent>
                        <CustomComponent>
                            <button onClick={this.handleSubmit}>Login</button>
                        </CustomComponent>
                    </ListGroup>*/}
                    <div className="container">
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={5}>
                                    Username
      </Col>
                                <Col md={2} className="inputs">
                                    <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={5}>
                                    Password
      </Col>
                                <Col md={2} className="inputs">
                                    <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <Button onClick={this.handleSubmit}>
                                        Sign in
        </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <a href={env.root + "/auth/google"}>
                        <img src={googleButton} alt="Sign in with Google" />
                    </a>
                </div>
            );
        }
    }
}

export default LoginForm;