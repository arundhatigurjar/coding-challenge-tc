import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import TicketGrid from "./Ticket";
import Lottery from "./Lottery";

export default class Paper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticket: null
        }
    }

    play = ticket => {
        this.setState({
            ticket: ticket
        });
    };

    render() {
        return (
            <div>
                <div className={'basic-card'}>
                    <Card>
                        <Card.Body>
                            <Card.Header>Ticket</Card.Header>
                            <TicketGrid
                                onPlay={this.play}
                            />
                        </Card.Body>
                    </Card>
                </div>
                <div className={'basic-card'}>
                    <Card>
                        <Card.Body>
                            <Card.Header>Play!</Card.Header>
                            <Lottery ticket={this.state.ticket}/>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        );
    }
}