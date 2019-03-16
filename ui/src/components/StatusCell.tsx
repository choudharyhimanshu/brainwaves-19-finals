import React, { Component } from 'react';
import {Icon, Table} from 'semantic-ui-react';
import {STATUSES} from "../constants";

export interface IStatusCellProps {
    status: string;
}

class StatusCell extends Component<IStatusCellProps, {}> {

    constructor(props: IStatusCellProps) {
        super(props);

    }

    getStatusLable(): string {
        const status = STATUSES.find(status => status.value ===  this.props.status);
        return status ? status.text : this.props.status;
    }

    render() {

        if (this.props.status === 'matched') {
            return(<Table.Cell positive><Icon name='check' /> {this.getStatusLable()}</Table.Cell>);
        }

        if (this.props.status === 'under-review') {
            return(<Table.Cell negative><Icon name='stopwatch' />{this.getStatusLable()}</Table.Cell>);
        }

        if (this.props.status === 'closefit') {
            return(<Table.Cell warning><Icon name='warning' /> {this.getStatusLable()}</Table.Cell>);
        }

        return(<Table.Cell>{this.getStatusLable()}</Table.Cell>);
    }

}

export default StatusCell;