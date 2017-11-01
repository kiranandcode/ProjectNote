import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import env from '../../env';
import axios from 'axios';


class NewProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project_name: '',
            redirectTo: null,
            errors: []
        }

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
        if(this.state.project_name) {
        axios.post(env.root + '/api/project/new', { project_name: this.state.project_name }).then(response => {
            if(response.data && !response.data.error) {
                this.setState({
                    redirectTo: '/'
                });
            } else if(response.data && response.data.error) {
                this.setState({
                    errors: [ JSON.stringify(response.data.error)]
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
                errors: ['Can not have a project with no name']
            });
        }
   }


    render() {
        if(this.state.redirectTo) {
            return (<Redirect to={{ pathname: this.state.redirectTo }}/>);
        } else {
            return (
                <div className="ProjectForm">
                    <h1>Create a new project</h1>
                    <form>
                        <label htmlFor="project_name">Project Name: </label>
                        <input type="text" name="project_name" value={this.state.project_name} onChange={this.handleChange}/>

                        <button onClick={this.handleSubmit}>Create</button>
                    </form>
                    <ul style={{listStyle:'none'}}>
                        {this.state.errors.map((err) => (
                            <li>
                                <pre>
                                    {JSON.stringify(err)}
                                </pre>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default NewProjectForm;