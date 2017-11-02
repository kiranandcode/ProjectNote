import React from 'react';

const Header = props => {
    let Greeting;

    if(props.user === null) {
        Greeting = <p>Please create an account or log in to begin!</p>
    } else if(props.user.firstName) {
        Greeting = (
            <p>
                Welcome to your Project-Notebook, <strong>{props.user.firstName}</strong>
            </p>
        );
    } else if(props.user.local.username) {
        Greeting = (
            <p>
                Welcome to your Project-Notebook, <strong>{props.user.local.username}</strong>
            </p>
        );
    }

    return (
        <div className="Header">
            {Greeting}
        </div>
    );
}


export default Header;
