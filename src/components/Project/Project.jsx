import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import Dialog from 'react-dialog';
import { Button, Panel } from 'react-bootstrap';


class Project extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: props.project_id,
            posts: [],
            message: '',
            authorized: false,
            errors: [],
            redirect: null,
            isDialogOpen: false
        };

        this.getposts = this.getposts.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.startDelete = this.startDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getposts(props) {
        // TOOD: retrieve projects from online
        console.log("project-getposts()");
        let new_id = null;

        if (props.project_id) {
            new_id = props.project_id;
        }
        console.log(new_id);

        if (props.user && new_id) {
            axios.get(env.root + '/api/project/' + new_id + '/posts').then(response => {
                console.log("Launching request and got this.");
                console.log(response);
                this.setState({
                    posts: response.data.posts,
                    id: new_id,
                    authorized: true
                });
            }).catch(err => {
                console.log("Got an error" + err);
                this.setState({
                    posts: [],
                    id: new_id,
                    authorized: false,
                    errors: []
                });
            });
        } else {
            this.setState({
                posts: [],
                id: new_id
            });
        }

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        if (this.state.message) {
            axios.post(env.root + '/api/project/' + this.props.project_id + '/posts/add', { message: this.state.message }).then(response => {
                if (response.data && !response.data.error) {
                    this.setState({
                        message: '',
                        errors: []
                    });
                    this.getposts(this.props);
                } else if (response.data && response.data.error) {
                    this.setState({
                        errors: [JSON.stringify(response.data.eror)]
                    });
                } else {
                    this.setState({
                        errors: ['Unknown error occurred']
                    });
                }
            }).catch(err => {
                this.setState({
                    errors: [JSON.stringify(err)]
                });
            });
        } else {
            this.setState({
                errors: ['Can not have a post with no message']
            });
        }
    }


    startDelete() {
        this.setState({
            isDialogOpen: true
        });

    }

    closeDelete() {
        this.setState({
            isDialogOpen: false
        });
    }
    deleteProject() {
        
        if (this.props.user && this.props.project_id) {
            axios.delete(env.root + '/api/project/' + this.props.project_id).then(response => {
                if (response.data && !response.data.error) {
                    this.setState({
                        redirect: '/'
                    });
                    this.closeDelete();
                }
            }).catch(err => {
                console.log(err);
                    this.closeDelete();
            });
        }
    }

    componentDidMount() {
        console.log("Project-componentDidMount");
        this.getposts(this.props);
    }

    componentWillReceiveProps(props) {
        console.log("Project-componentWillRecieveProps()");
        this.getposts(props);
    }

    render() {

        console.log("Project-render()");
        if (this.props.user && !this.state.redirect) {
            // TODO: present retrieved projects if here
            if (this.state.authorized) {
                return (
                    <div className="Home">
                        <h3>DevLog for Project</h3>
                        <form className="PostForm">
                            <label htmlFor="message">Update: </label>
                            <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
                            <button onClick={this.handleSubmit}>Send</button>
                        </form>
                        {this.state.errors.length !== 0 &&
                            (<div><h4>Errors</h4>
                                <ul>
                                    {this.state.errors.map((err) => (
                                        <li>
                                            <pre>
                                                {JSON.stringify(err)}
                                            </pre>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            )
                        }

                        <ul style={{ listStyle: 'none' }}>
                            {this.state.posts.map(post => (
                                <li>
                                    <p><strong>{post.person.local.username}</strong> - {post.message}/{post.date}</p>
                                </li>
                            ))}
                        </ul>

                        <Button onClick={this.startDelete}>Delete Project</Button>
                        {
                            this.state.isDialogOpen && (
                                <Panel header="Confirm delete" bsStyle="danger">
                                    Are you sure you want to delete this project?
                                    <Button onClick={this.deleteProject}>Yes, delete it.</Button>
                                    <Button onClick={this.closeDelete}>No, nevermind.</Button>
                                </Panel>
                            )
                        }


                    </div>
                );
            } else {
                return (
                    <div className="Project">
                        <h3>Unauthenticated</h3>
                        <p>You are not authenticated to view this page.</p>
                        <Link to="/" >Back</Link>
                    </div>
                )
            }
            // TOOD add functionality to create Project
        } else {
            return (
                <Redirect to={{ pathname: '/' }} />
            );
        }
    }
}


export default Project;