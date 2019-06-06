import React from 'react';
import Button from 'react-bootstrap/Button';
import "./Logout.css"
import {http} from "../Service/http";

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogoutHandler = (event) => {
        event.preventDefault();
        http
            .delete("/api/logout")
            .then((response) => {
                console.log(response );
                localStorage.clear();
                this.props.onLogout()
            })
            .catch();
    };

    render() {
        return (
            <a
                href={"#"}
                className="logout-btn"
                // variant={"outline-light"}
                onClick={this.onLogoutHandler}>
                <i className="fas fa-sign-out-alt"></i>
            </a>

        )
    }
}

export default Logout;