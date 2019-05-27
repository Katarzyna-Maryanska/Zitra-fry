import React from 'react';
import Button from 'react-bootstrap/Button';
import "./Logout.css"
import {http} from "../http";

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogoutHandler = (event) => {
        event.preventDefault();
        http
            .delete("/api/logout")
            .then((response) => {
                console.log(response);
                localStorage.clear();
                this.props.onLogout()
            })
            .catch();
    };

    render() {
        return (
            <Button
                variant={"secondary"}
                onClick={this.onLogoutHandler}
            >Wyloguj</Button>

        )
    }
}

export default Logout;