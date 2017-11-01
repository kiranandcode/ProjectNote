import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import env from '../env';


class Project extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: props.project_id,
            posts: [],
            message: '',
            authorized: false
        };
    }

    componentWillReceiveProps(props) {
        // TOOD: retrieve projects from online
        let new_id = null;

        if (props.project_id) {
            new_id = props.project_id;
        }
        console.log(new_id);

        if (props.user && new_id) {
            axios.get(env.root + '/api/project/' + new_id + '/posts').then(response => {
                console.log(response);
                this.setState({
                    posts: response.data,
                    id: new_id,
                    authorized: true
                });
            }).catch(err => {
                this.setState({
                    posts: [],
                    id: new_id,
                    authorized: false
                });
            });
        } else {
            this.setState({
                posts: [],
                id: new_id
            });
        }

    }

    render() {
        if (this.props.user) {
            // TODO: present retrieved projects if here
            if (this.state.authorized) {
                return (
                    <div className="Home">
                        <h3>DevLog for Project</h3>

                        <ul style={{ listStyle: 'none' }}>
                            {this.state.posts.map(post => (
                                    <li>
                                        <p><strong>{post.person.username}</strong> - {post.message}/{post.date}</p>
                                    </li>
                            ))}
                       </ul>
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