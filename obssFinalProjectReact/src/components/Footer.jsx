import React from 'react';
import { Container, Grid, List, Segment } from 'semantic-ui-react';

const Footer = () => {
    return (
        <Segment inverted vertical style={{ padding: '2em 0em', marginTop: '2em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={7}>
                            <h4>Company Name 2024 ©</h4>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <h4>About Us</h4>
                            <List link inverted>
                                <List.Item as='a'>About Us</List.Item>
                                <List.Item as='a'>Contact Us</List.Item>
                                <List.Item as='a'>FAQ</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h4>Contact</h4>
                            <List link inverted>
                                <List.Item>Email: info@company.com</List.Item>
                                <List.Item>Phone: +1 (123) 456-7890</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
};

export default Footer;
