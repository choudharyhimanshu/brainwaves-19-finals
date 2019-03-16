import React, { Component } from 'react';
import {Button, Header, Icon, Modal} from "semantic-ui-react";
import SGMessage from "../models/SGMessage";
import ClientMessage from "../models/ClientMessage";

export interface ICompareModalProps {
    sgRef: string;
    clientRef: string;
}

export interface ICompareModalState {
    sgMessage: SGMessage | undefined;
    clientMessage: ClientMessage | undefined;
    isModalOpen: boolean;
}

class CompareModal extends Component<ICompareModalProps, ICompareModalState> {

    constructor(props: ICompareModalProps) {
        super(props);

        this.state = {
            sgMessage: undefined,
            clientMessage: undefined,
            isModalOpen: false
        }
    }

    handleOpen = () => this.setState({ isModalOpen: true })

    handleClose = () => this.setState({ isModalOpen: false })

    render() {
        return(
            <Modal
                trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
                open={this.state.isModalOpen}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Header icon='browser' content='Cookies policy' />
                <Modal.Content>
                    <h3>This website uses cookies to ensure the best user experience.</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CompareModal;