import React from 'react';
import "./Scanner.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Camera from "./Camera/Camera";
import {http} from "../Service/http";
import InputArea from "./InputArea";
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";

class Scanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            lastScannedCode: '',
            showInputArea: false,
            showEnterCodeButton: true,
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
            this.getProduct(code);
        }
    };

    onEnterCodeClickHandler = () => {
        this.setState({ showInputArea: true });
    };

    onCancelCodeClickHandler = () => {
        this.setState({
            showInputArea: false
        });
    };

    onAcceptCodeClickHandler = () => {
        this.setState({
            showEnterCodeButton: false,
            showInputArea: false
        })
    };

    render() {
        return(
            <div className="scanner">
                <Camera getCodeCallback={this.cameraCodeHandler}/>

                <ListGroup>
                    <ListGroup.Item
                        variant="secondary">
                        {this.state.showInputArea ?
                            <InputArea
                                getProduct={(code) => this.getProduct(code)}
                                hideInputArea={() => this.onCancelCodeClickHandler()}
                                showOrderText={() => this.onAcceptCodeClickHandler()}
                            /> : null
                        }
                        {!this.state.showInputArea &&
                            <div>
                                Zeskanuj kod QR
                                {this.state.showEnterCodeButton ?
                                    <Button
                                        className="enter-code-button"
                                        variant={"light"}
                                        onClick={this.onEnterCodeClickHandler}
                                    >Wpisz</Button> : null
                                }
                            </div>
                        }
                    </ListGroup.Item>

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