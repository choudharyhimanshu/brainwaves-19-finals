import React, { Component } from 'react';
import {Button, Divider, Header, Icon, Modal, Segment, Grid, Loader, Dimmer, Placeholder} from "semantic-ui-react";
import SGMessage from "../models/SGMessage";
import ClientMessage from "../models/ClientMessage";

import messagesService from '../services/MessagesService';
import {toast} from "react-toastify";

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
            >
                {/*<Header icon='browser' content='Cookies policy' />*/}
                <Modal.Content>
                    {(isSGMessageLoading || isClientMessageLoading) &&
                    <Segment basic>
                        <Placeholder>
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
                    <Segment.Group>
                        <Segment>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical>v/s</Divider>
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>SG Data</Grid.Column>
                                    <Grid.Column>Client Data</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical><Icon name='exclamation circle'/></Divider>
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>foo</Grid.Column>
                                    <Grid.Column>bar</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical><Icon name='exclamation circle'/></Divider>
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>foo</Grid.Column>
                                    <Grid.Column>bar</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical><Icon name='exclamation circle'/></Divider>
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>foo</Grid.Column>
                                    <Grid.Column>bar</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Segment.Group>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CompareModal;