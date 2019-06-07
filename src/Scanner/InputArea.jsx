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
        if (this.state.code.length !== 8) {
            alert("Kod zamówienia powinien mieć 8 znaków")
        } else {
            this.props.onCodeTyped(this.state.code);
        }
    };

    render() {
        return (
            <div className="input-area">
                <InputGroup className="mb-3">
                    <FormControl
                        className="form-control-scanner"
                        placeholder="Wpisz kod zamówienia"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => {
                            this.setState({ code: e.target.value})
                        }}
                    />
                    <InputGroup.Append>
                        <Button
                            variant={"outline-secondary"}
                            onClick={this.onSubmitHandler}
                        >OK</Button>
                    </InputGroup.Append>
                </InputGroup>

            </div>
        );
    }
}

export default InputArea;