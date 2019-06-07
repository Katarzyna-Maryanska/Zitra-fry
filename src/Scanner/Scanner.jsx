import React from 'react';
import "./Scanner.css";
import deliveryService from "../DeliveryService"
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Camera from "./Camera/Camera";
import {http} from "../Service/http";
import InputArea from "./InputArea";

class Scanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            lastScannedCode: '',
            showInputArea: true,
        };
    }

    cameraCodeHandler = (code) => {
        if (this.state.lastScannedCode !== code) {
            this.setState({lastScannedCode: code});
            deliveryService
                .getDeliveryProduct(code)
                .then((products) => {
                    this.setState({
                        products: products
                    })
                })
                .catch((error) => alert("Numer zamówienia nie odnaleziony"))
        }
    };

    render() {
        return(
            <div className="scanner">
                <Camera getCodeCallback={this.cameraCodeHandler}/>

                <ListGroup className="order-container">
                    {this.state.showInputArea ?
                        <InputArea
                            onCodeTyped = {(code) => deliveryService
                                .getDeliveryProduct(code)
                                .then((products) => {
                                    this.setState({
                                        products: products
                                    })
                                }).catch((error) => alert("Numer zamówienia nie odnaleziony"))
                            }
                        /> : null
                    }

                    <ListGroup className="order-group-scroll">
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