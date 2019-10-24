import React, {useState} from 'react';
import styles from "./Scanner.module.css";
import {getDeliveryProduct} from "../service/deliveryService";
import ListGroup from 'react-bootstrap/ListGroup';
import Camera from "./Camera/Camera";
import InputArea from "./InputArea";

const Scanner = (props) => {

    const [products, setProducts] = useState([]);
    const [lastScannedCode, setLastScannedCode] = useState("");
    const [showInputArea] = useState(true);

    const cameraCodeHandler = (code) => {
        if (lastScannedCode !== code) {
            setLastScannedCode(code);

            getDeliveryProduct(code)
            .then((products) => {setProducts(products)})
            .catch((error) => alert("Numer zamówienia nie odnaleziony"))
        }
    };

    return(
        <div className={styles.scanner}>
            <Camera getCodeCallback={cameraCodeHandler}/>

            <ListGroup className={styles.orderContainer}>
                {showInputArea ?
                    <InputArea
                        onCodeTyped = {(code) =>
                            getDeliveryProduct(code)
                            .then((products) => {setProducts(products)})
                            .catch((error) => alert("Numer zamówienia nie odnaleziony"))
                        }
                    /> : null
                }

                <ListGroup className={styles.orderGroupScroll}>
                    {products.map((item, index) => {
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
};

export default Scanner;
