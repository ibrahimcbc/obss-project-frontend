import React ,{ useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleChange = (e, { name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            console.log('Login successful:', response.data);
            // Login başarılı olursa, kullanıcıyı ana sayfaya yönlendirebilirsiniz
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error.response.data);
            // Hata durumunda bir mesaj gösterebilirsiniz
            alert('Invalid username or password');
        }
    };

    return (
        <Container textAlign="center" style={{ padding: '50px 0', minHeight: '80vh' }}>
            <Form onSubmit={handleLoginSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
                <Form.Input
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    onChange={handleChange}
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
