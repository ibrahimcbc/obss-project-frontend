import React, { useEffect, useState } from 'react';
import { Container, Grid, Header, Button, Card, Image } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import * as jwt_decode from "jwt-decode";
import * as ProductService from '../services/ProductService';
import * as UserService from '../services/UserService';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode.default(token);
            if (decodedToken.sub === userId) {
                setIsOwner(true);
            }
        }

        const fetchUserAndProducts = async () => {
            try {
                const userResponse = await UserService.getUserById(userId);
                setUser(userResponse.data);
                const productsResponse = await ProductService.getProductsByUserId(userId);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Error fetching user or products:', error);
            }
        };

        fetchUserAndProducts();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container style={{ padding: '20px' }}>
            <Grid>
                <Grid.Row style={{ backgroundColor: 'lightblue' }}>
                    <Grid.Column width={10}>
                        <Header as='h1'>{user.name} {user.surname}</Header>
                        <Header as='h5'>@{user.username}</Header>
                        <Header as='h4'>Followers: {user.followers.length}</Header>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                        <Header as='h2'>Average Review Score: {user.averageScore}</Header>
                        <Button color='red'>Block User</Button>
                        <Button secondary>Follow</Button>
                        {isOwner && <Button primary>Add Product</Button>}
                    </Grid.Column>  
                </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row columns={4}>
                    {products.map(product => (
                        <Grid.Column key={product.id}>
                            <Card>
                                <Image src={product.imageUrl} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{product.title}</Card.Header>
                                    <Card.Meta>${product.price}</Card.Meta>
                                    <Card.Description>
                                        Average Score: {product.averageScore || 'N/A'} / 5
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default UserProfile;
