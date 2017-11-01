import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../env';


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
            if(props.user) {
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
        if(this.props.user) {
                    // TODO: present retrieved projects if here
            return (
                <div className="Home">
                    <h3>Your projects</h3>
                    
                    <ul style={{listStyle: 'none'}}>
                    {this.state.projects.map(project => (
                        <Link to={"/project/view/" + project._id}>
                            <li>
                                <p><strong>{project.name}</strong> - {project.people.length}</p>
                            </li>
                        </Link>
                    ))}
                    <Link to="/project/new">
                    <li>
                        Create new project
                    </li>
                    </Link>
                    </ul>
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