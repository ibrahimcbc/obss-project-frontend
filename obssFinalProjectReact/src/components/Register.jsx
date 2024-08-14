import React, { useState } from 'react';
import { Button, Form, Dropdown, Container } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        role: 'USER', // Varsayılan olarak USER seçili
        email: '',
    });

    const roleOptions = [
        { key: 'admin', text: 'ADMIN', value: 'ADMIN' },
        { key: 'user', text: 'USER', value: 'USER' },
    ];

    const handleChange = (e, { name, value }) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // İlk olarak rolü oluştur
            const roleResponse = await axios.post('http://localhost:8080/api/roles', {
                name: formData.role
            });

            const roleId = roleResponse.data.id;

            // Ardından kullanıcıyı oluştur
            const userResponse = await axios.post('http://localhost:8080/api/users', {
                name: formData.name,
                surname: formData.surname,
                username: formData.username,
                password: formData.password,
                email: formData.email,
                roles: [{ id: roleId, name: formData.role }] // Role'ü user'a ekle
            });

            console.log('User registered successfully:', userResponse.data);
            navigate('/login'); // Başarılı kayıt sonrası login sayfasına yönlendirme
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <Container text>
            <Form onSubmit={handleRegister}>
                <Form.Input
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    label="Surname"
                    placeholder="Surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                />
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Form.Field>
                    <label>Role</label>
                    <Dropdown
                        placeholder="Select Role"
                        fluid
                        selection
                        options={roleOptions}
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </Form.Field>
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
        </Container>
    );
};
export default Register;
