import React ,{ useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            const token = response.data.token; // Token'ı JSON içinden alıyoruz
            localStorage.setItem('token', token); // Token'ı localStorage'da saklıyoruz
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
            // Örnek olarak, kullanıcı bilgilerini alabiliriz
            const userId = decodedToken.userId;
            const roles = decodedToken.roles;

            // Token ile diğer kullanıcı bilgilerini kullanarak uygulamanın durumu güncelleyebilirsiniz
            console.log('UserId:', userId);
            console.log('Roles:', roles);
            navigate('/'); // Giriş başarılıysa ana sayfaya yönlendiriyoruz
            window.location.reload();
        } catch (error) {
            console.error("Login failed:", error);
            alert('Login failed. Please check your credentials.');
        }
    };


    return (
        <Container textAlign="center" style={{ padding: '50px 0', minHeight: '80vh' }}>
            <Form onSubmit={handleLoginSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
                <Form.Input
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                />
                <Form.Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
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
