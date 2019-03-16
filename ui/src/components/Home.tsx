import React, { Component } from 'react';
import {Container, Placeholder, Segment} from "semantic-ui-react";

class Home extends Component {

    render() {
        return(
            <Container>
                <h2>Welcome, User!</h2>
                <hr />
                <Segment>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
            </Container>
        );
    }
}

export default Home;
