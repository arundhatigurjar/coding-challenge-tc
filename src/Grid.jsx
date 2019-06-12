import React from "react";
import Table from "react-bootstrap/Table";

//TODO: Compulsory props
export default class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    renderRow = (columns, index) => {
        if(columns)
            return <Tr key={`tr-${index}`} index={index} columns={columns}/>
    };
    renderRows = () => {
        let data = this.props.data;
        if(data){
            return data.map(this.renderRow);
        }
    };

    render () {
        return (
            <div>
                <Table bordered>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </Table>

            </div>
        );

    }
}

function Td(props) {
    return <td key={`column-${props.value}`} className={props.className} onClick={(e)=>props.onClick(props.value)}>{props.value}</td>;
}

function Tr(props) {
    return (
        <tr key={`row-${props.index}`}>
            {
                props.columns.map((column, index) => {
                    return <Td key={`td-${column.value}`} value={column.value} className={column.className} onClick={column.onClick ? column.onClick : ({})}/>;
                })
            }
        </tr>);
}