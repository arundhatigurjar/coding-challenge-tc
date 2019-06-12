import React from "react";
import Button from "react-bootstrap/Button";
import {MAX_SELECTION, MAX_VALUE, MIN_VALUE} from "./Constants";
import Grid from "./Grid";

class Ticket extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numbers: []
        };
    }

    componentDidMount() {
        this.resetTicket();
    }

    getNumbers = () => {
        return this.state.numbers.sort((a, b) => a - b);
    };

    addNumber = number => {
        if (this.state.numbers.length === MAX_SELECTION) {
            //TODO: add alert
            return;
        }
        if (!this.exists(number))
            this.setState({
                numbers: this.state.numbers.concat(number)
            });
    };
    removeNumber = number => {
        let index = this.state.numbers.indexOf(number);
        if (index > -1) {
            let numbers = this.state.numbers;

            numbers.splice(index, 1);

            this.setState({
                numbers: numbers
            });
        }
    };
    exists = number => {
        return this.numbers.indexOf(number) > -1;
    };
    resetTicket = () => {
        this.setState({
            numbers: []
        });
    };
    createTicket = () => {
        let data = [];
        let i = MIN_VALUE;
        do {
            let columns = [];
            do {

                columns.push({
                    value: i,
                    className: this.getClass(i),
                    onClick: this.onSelect
                });

                i++;
            } while (i % 10 !== 1);

            data.push(columns);

        } while (i <= MAX_VALUE);

        return data;
    };
    getClass = (value) => {
        return this.exists(value) ? 'selected' : '';
    };
    onSelect = (number) => {
        if (!this.exists(number)) {
            this.addNumber(number);
        }
        else {
            this.removeNumber(number);
        }
    };
    exists = value => {
        return this.state.numbers.indexOf(value) > -1
    };
    play = () => {
        if (this.props.onPlay) {
            this.props.onPlay(this.getNumbers());
        }
    };

    render() {
        return (<div>
            <Grid data={this.createTicket()}/>
            <div style={{display:'inline-block'}}>
                <Button variant="danger" onClick={() => this.resetTicket()}>Reset</Button>
                <Button variant="success" onClick={() => this.play()}
                        disabled={this.state.numbers.length !== MAX_SELECTION}>Create Ticket</Button>
            </div>

        </div>);
    }
}

export default Ticket;
