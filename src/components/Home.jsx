import React, { Component } from 'react';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // TOOD: retrieve projects from online
    }

    render() {
        if(this.props.user) {
                    // TODO: present retrieved projects if here
            return (
                <div className="Home">
                    <p>Current User: </p>
                    <code>
                        {JSON.stringify(this.props)}
                    </code>
                </div>
            );
        } else {
            return (
                <div className="Home">
                    <p>Current User: </p>
                    <code>
                        {JSON.stringify(this.props)}
                    </code>
                </div>
            );
        }
    }
}


export default Home;