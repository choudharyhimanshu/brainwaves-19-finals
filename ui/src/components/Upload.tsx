import React, { Component } from 'react';
import {Button, Container, Header, Icon, Input, Segment} from "semantic-ui-react";

class Upload extends Component {

    render() {
        return(
            <Container>
                <Segment placeholder>
                    <Header icon>
                        <Icon name='file' />
                        Click to select or drop your files here!
                    </Header>
                    <Button primary>Select Files</Button>
                    <input type='files' />
                </Segment>
            </Container>
        );
    }
}

export default Upload;
