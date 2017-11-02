import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../env';

import { ListGroup, ListGroupItem, Badge, Glyphicon } from 'react-bootstrap';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

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
                            <ListGroupItem style={{ width: "200px", height: "200px", marginRight: "20px", marginBottom: "20px", float: "left" }}>
                                <Card>
                                    <CardBody>
                                        <CardTitle><strong>{project.name}</strong></CardTitle>
                                        <Badge>{project.people.length} <Glyphicon glyph="user" /> contributors</Badge>

                                        <Link style={{position: "relative", top: "65px"}} to={"/project/view/" + project._id}>
                                            <Button style={{backgroundColor:"#3b80ef", color:"white"}}>View Project</Button>
                                        </Link>

                                    </CardBody>

                                </Card>

                            </ListGroupItem>

                        ))}
                    </ListGroup>

                    <Link to="/project/new" >
                        <Button style={{ width: "200px", height: "50px", backgroundColor:"#3b80ef", color:"white", position:"fixed", bottom:"40px", left:"150px"}}>
                            <p><Glyphicon glyph="plus" /> Create new project</p>
                        </Button>
                    </Link>
                </div >

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