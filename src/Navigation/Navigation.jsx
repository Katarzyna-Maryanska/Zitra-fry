import React from 'react';
import "./Navigation.css"
import Nav from 'react-bootstrap/Nav'
import {
    Link
} from 'react-router-dom';

class Navigation extends React.Component{
    render() {
        return (
            <Nav className="nav-bottom" justify variant="tabs">
                <Nav.Item>
                    <Link className="nav-link" to="/fry/trasa">Trasa</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/frygi/skaner">Skaner</Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Navigation;