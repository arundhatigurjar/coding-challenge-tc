import React from "react";
import Button from "react-bootstrap/Button";
import {MAX_BALL_DRAW, MAX_VALUE} from "./Constants";

export default class Draw extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            draw: [],
            drawing: false,
            counter: 0,
            timer : null
        };
    }

    componentDidMount() {
        this.resetDraw();
    }

    generateRandomNumber = () => {
        let randomNumber = Math.floor(Math.random() * MAX_VALUE);
        randomNumber++;
        if (this.state.draw.indexOf(randomNumber) > -1) {
            randomNumber = this.generateRandomNumber();
        }
        return randomNumber;
    };
    draw = () => {
        this.resetDraw();
        let timer = setInterval(() => {
            this.sequentialDraw();
            if (this.state.counter >= MAX_BALL_DRAW) {
                clearInterval(timer);
                this.setState({
                    drawing: false
                });
            }
        }, 2000);
        this.setState({
            timer: timer
        });

    };
    sequentialDraw = () => {
        let newNumber = this.generateRandomNumber();
        let newDraw = this.state.draw;
        newDraw[this.state.counter] = newNumber;
        newDraw.sort((a, b) => a - b);

        this.setState({
            draw: newDraw,
            drawing: true,
            counter: this.state.counter + 1
        }, () => {
            if (this.props.onDraw) {
                this.props.onDraw(newDraw);
            }
        });
    };
    resetDraw = () => {
        let dummyDraw = [];
        for (let i = 0; i < MAX_BALL_DRAW; i++) {
            dummyDraw.push('*');
        }
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
        this.setState({
            draw: dummyDraw,
            drawing: false,
            counter: 0
        });
    };
    renderDraw = () => {
        return this.state.draw.map((number, i) => {
            let className = isNaN(number) ? 'empty-ball' : 'ball';
            return (<div key={`draw-${i}`} className={className}>
                    {number}
                </div>
            );
        });
    };

    render() {
        return (
            <div>
                {this.renderDraw()}
                <div style={{margin: '10px'}}><Button variant="outline-secondary" onClick={() => this.draw()}
                                                      disabled={this.props.disabled || this.state.drawing}>Draw</Button>
                </div>
            </div>
        );
    }
}