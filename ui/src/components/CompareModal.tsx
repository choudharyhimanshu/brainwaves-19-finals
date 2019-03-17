import React, { Component } from 'react';
import {
    Button,
    Divider,
    Header,
    Icon,
    Modal,
    Segment,
    Grid,
    Loader,
    Dimmer,
    Placeholder,
    Table
} from "semantic-ui-react";
import SGMessage from "../models/SGMessage";
import ClientMessage from "../models/ClientMessage";

import messagesService from '../services/MessagesService';
import {toast} from "react-toastify";
import {KEY_PAIRS_TO_MATCH, KEY_TO_MATCH_LABELS} from "../constants";

export interface ICompareModalProps {
    sgRef: string;
    clientRef: string;
    onModalClose: () => void;
}

export interface ICompareModalState {
    sgMessage: SGMessage | undefined;
    clientMessage: ClientMessage | undefined;
    isModalOpen: boolean;
    isSGMessageLoading: boolean;
    isClientMessageLoading: boolean;
}

class CompareModal extends Component<ICompareModalProps, ICompareModalState> {

    constructor(props: ICompareModalProps) {
        super(props);

        this.state = {
            sgMessage: undefined,
            clientMessage: undefined,
            isModalOpen: true,
            isSGMessageLoading: true,
            isClientMessageLoading: true
        }
    }

    handleOpen = () => this.setState({ isModalOpen: true })

    handleClose = () => {
        this.setState({ isModalOpen: false });
        this.props.onModalClose();
    }

    getKeyValue(obj: any, key: string): string {
        console.log(key);
        return (obj.hasOwnProperty(key)) ? obj[key] : '';
    }

    private fetchSGMessage() {
        messagesService.getSgMessageByRef(this.props.sgRef).then(message => {
            this.setState({
                isSGMessageLoading: false,
                sgMessage: message
            });
        }).catch(error => {
            toast.error(error.status + ':' + error.statusText);
            this.setState({
                isSGMessageLoading: false
            });
        });
    }

    private fetchClientMessage() {
        messagesService.getClientMessageByRef(this.props.clientRef).then(message => {
            this.setState({
                isClientMessageLoading: false,
                clientMessage: message
            });
        }).catch(error => {
            toast.error(error.status + ':' + error.statusText);
            this.setState({
                isClientMessageLoading: false
            });
        });
    }

    componentDidMount(): void {
        this.fetchSGMessage();
        this.fetchClientMessage();
    }

    render() {

        const {clientMessage, isClientMessageLoading, sgMessage, isSGMessageLoading, isModalOpen} = this.state;

        return(
            <Modal
                open={isModalOpen}
                onClose={this.handleClose}
                dimmer='blurring'
            >
                <Modal.Content>
                    {(isSGMessageLoading || isClientMessageLoading) &&
                        <Segment basic>
                            <Placeholder fluid>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Segment>
                    }
                    {sgMessage && clientMessage &&
                    <Table definition>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell/>
                                <Table.HeaderCell>SG Data</Table.HeaderCell>
                                <Table.HeaderCell>Client Data</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                Object.keys(KEY_PAIRS_TO_MATCH).map(key =>
                                    <Table.Row key={key} textAlign='center'>
                                        <Table.Cell>{ this.getKeyValue(KEY_TO_MATCH_LABELS, key) }</Table.Cell>
                                        <Table.Cell>{ this.getKeyValue(sgMessage, key) }</Table.Cell>
                                        <Table.Cell>{ this.getKeyValue(clientMessage, this.getKeyValue(KEY_PAIRS_TO_MATCH, key)) }</Table.Cell>
                                        <Table.Cell>{ this.getKeyValue(sgMessage, key) === this.getKeyValue(clientMessage, this.getKeyValue(KEY_PAIRS_TO_MATCH, key))
                                                ? <Icon name='check circle' color='green'/>
                                                : <Icon name='exclamation circle' color='red'/> }</Table.Cell>
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose}>
                        <Icon name='checkmark' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CompareModal;