import React from 'react';
import "./Scanner.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Camera from "./Camera/Camera";
import {http} from "../Service/http";
import InputArea from "./InputArea";

class Scanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            lastScannedCode: ''
        };
    }

    getProduct(code) {
        http
            .get(`/api/deliverers/deliveries/human-ids/${code}/products`)
            .then((response) => {
                this.setState({products: response.data})
            })
            .catch()
    }

    cameraCodeHandler = (code) => {
        if (this.state.lastScannedCode !== code) {
            this.setState({lastScannedCode: code});
            this.getProduct(code).bind(this);
        }
    };

    render() {
        return(
            <div className="scanner">
                <Camera getCodeCallback={this.cameraCodeHandler}/>
                <InputArea getProduct= {(code) => this.getProduct(code)}/>
                <ListGroup>
                    <ListGroup.Item variant="secondary">Zamówienie</ListGroup.Item>
                    <ListGroup className="orders-scroll">
                        {this.state.products.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ListGroup.Item variant="action">{item.name}</ListGroup.Item>
                                </div>
                            )})
                        }
                    </ListGroup>
                </ListGroup>
            </div>
        )
    }
}

export default Scanner;