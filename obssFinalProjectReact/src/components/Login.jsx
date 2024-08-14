import React ,{ useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json(); // JSON yanıtını parse ediyoruz
                console.log('Login successful:', data);
                const token = data.token; // Token'ı alıyoruz
                // Token'ı localStorage'a kaydet
                localStorage.setItem("token", token);
                navigate(`/`);
            } else {
                console.error("Login failed:", response.statusText);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Container textAlign="center" style={{ padding: '50px 0', minHeight: '80vh' }}>
            <Form onSubmit={handleLoginSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
                <Form.Input
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button primary type="submit">
                        Login
                    </Button>
                    <Button primary onClick={handleRegisterClick}>
                        Register
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;
