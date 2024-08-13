import React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginSubmit = () => {
        console.log('Login Submitted');
    };

    return (
        <Container textAlign="center" style={{ padding: '50px 0', minHeight: '80vh' }}>
            <Form onSubmit={handleLoginSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
                <Form.Input
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    required
                />
                <Form.Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button primary type="submit">
                        Login
                    </Button>
                    <Button secondary onClick={handleRegisterClick}>
                        Register
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;
