import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import "./InputArea.css"

class InputArea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.getProduct(this.state.code);
        this.props.showOrderText();
    };

    onCancelHandler = (event) => {
        event.preventDefault();
        this.props.hideInputArea();
    };

    render() {
        return (
            <div className="input-area">
                <FormControl
                    className="form-control-scanner"
                    placeholder="Wpisz kod zamówienia"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => {
                        this.setState({ code: e.target.value})
                    }}
                />
                <Button
                    className="ok-button"
                    variant={"outline-secondary"}
                    onClick={this.onSubmitHandler}
                >OK</Button>
                <Button
                    variant={"outline-secondary"}
                    onClick={this.onCancelHandler}
                >Anuluj</Button>
            </div>
        );
    }
}

export default InputArea;