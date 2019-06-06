import React from 'react';
import Nav from 'react-bootstrap/Nav'
import "./Header.css"
import Logout from "../Logout/Logout";

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Nav className="header-container">
                <div className="empty-div"></div>
                <div className="navbar-brand">FRY</div>
                <Logout onLogout={() => this.props.onLogout()}/>
            </Nav>
        );
    }
}

export default Header;