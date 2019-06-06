import React from 'react';
import "./Scanner.css";
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

    onAcceptCodeClickHandler = () => {
        this.setState({
            showInputArea: false
        })
    };

    render() {
        return(
            <div className="scanner">
                {/*<label className="scan-code-text">Zeskanuj kod QR</label>*/}
                <Camera getCodeCallback={this.cameraCodeHandler}/>

                <ListGroup className="order-container">
                    {this.state.showInputArea ?
                        <InputArea
                            getProduct={(code) => this.getProduct(code)}
                            showOrderText={() => this.onAcceptCodeClickHandler()}
                        /> : null
                    }
                    {!this.state.showInputArea &&
                    <ListGroup.Item
                        variant="secondary"
                        onClick={this.onAcceptCodeClickHandler}>
                    Zamówienie</ListGroup.Item>}

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