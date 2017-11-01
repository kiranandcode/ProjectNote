import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../env';

import {ListGroup, ListGroupItem, Badge, Glyphicon} from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };

        this.getprojects = this.getprojects.bind(this);
    }

    getprojects(props) {
        console.log("Home - getprojects()");
        if (props.user) {
            axios.get(env.root + '/api/project').then(response => {
                this.setState({
                    projects: response.data
                });
            }).catch(err => {
                this.setState({
                    projects: []
                });
            });
        } else {
            this.setState({
                projects: []
            });
        }

    }
    componentDidMount() {
        console.log("Home-componentDidMount");
        this.getprojects(this.props);
    }
    componentWillReceiveProps(props) {
        console.log("Home-componentWillRecieveProps()");
        // TOOD: retrieve projects from online
        this.getprojects(props);

    }

    render() {
        console.log("Home-Render()");
        if (this.props.user) {
            // TODO: present retrieved projects if here
            return (
                <div className="Home container">
                    <h3>Active Projects</h3>
                    <ListGroup>
                        {this.state.projects.map(project => (
                            <ListGroupItem>
                                <Link to={"/project/view/" + project._id}>
                                    <p><strong>{project.name}</strong>   <Badge>{project.people.length} <Glyphicon glyph="user"/></Badge></p>
                                </Link>
                            </ListGroupItem>
                        ))}
                        <ListGroupItem>
                            <Link to="/project/new">
                                <Glyphicon glyph="plus"/> Create new project
                            </Link>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            );
            // TOOD add functionality to create Project
        } else {
            return (
                <div className="Home">
                    <p>Please login to view your projects</p>
                </div>
            );
        }
    }
}


export default Home;