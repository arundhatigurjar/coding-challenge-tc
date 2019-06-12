import React from "react";
import Draw from "./Draw";

export default class Lottery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            draw: []
        };
    }

    renderTicket = () => {
        let ticket = this.props.ticket;
        if (ticket) {
            return ticket.map((number, i) => {
                let className = 'display-numbers ' + this.getClass(number);
                return (
                    <div key={`ticket-${number}`} style={{display: 'inline-block'}} className={className}>{number}</div>
                );
            });
        }
    };
    onDraw = (numbers) => {
        this.setState({
            draw: numbers
        });
    };
    getClass = (number) => {
        if (this.props.ticket)
            return this.state.draw.indexOf(number) > -1 ? 'match' : '';
    };

    render() {
        let disabled = this.props.ticket && (this.props.ticket.length === 10) ? false : true;
        return (
            <div className={'lottery'}>
                {disabled ? <p style={{color: 'red'}}>Please create a ticket to play!</p> : <p>Your numbers: </p>}
                <div>
                    {this.renderTicket()}
                </div>

                Lottery
                <Draw onDraw={this.onDraw} disabled={disabled}/>
            </div>
        );
    }
}