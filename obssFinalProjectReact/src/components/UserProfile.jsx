import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Header, Button, Card, Image } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
import * as UserService from '../services/UserService';
import { AuthContext } from '../AuthContext';

const UserProfile = () => {
    const navigate = useNavigate(); 
    const { userId: profileUserId } = useParams();
    const { userId: authUserId } = useContext(AuthContext);  // AuthContext'ten userId'yi alıyoruz
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);


    useEffect(() => {
        if (authUserId && authUserId.toString() === profileUserId) {
            setIsOwner(true);
        }

        const fetchUserAndProducts = async () => {
            try {
                const userResponse = await UserService.getUserById(profileUserId);
                setUser(userResponse.data);
                const productsResponse = await ProductService.getProductsByUserId(profileUserId);
                setProducts(productsResponse.data);
                if (userResponse.data.blackList.includes(parseInt(authUserId))) {
                    setIsBlocked(true);
                }
            } catch (error) {
                console.error('Error fetching user or products:', error);
            }
        };

        const checkIfBlocked = async () => {
            try {
                if (!authUserId) {
                    setIsBlocked(false);
                    return;
                }
                const response = await UserService.checkIfBlocked(authUserId, profileUserId);
                setIsBlocked(response.data);
            } catch (error) {
                console.error('Error checking if favorite:', error);
            }
        };

        fetchUserAndProducts();
        checkIfBlocked();
    }, [profileUserId, authUserId]); 


    const handleBlockUnblock = async () => {
        try {
            if (isBlocked) {
                await UserService.removeFromBlacklist(authUserId, profileUserId);
                setIsBlocked(false);
            } else {
                await UserService.addToBlacklist(authUserId, profileUserId);
                setIsBlocked(true);
            }
        } catch (error) {
            console.error('Error blocking/unblocking user:', error);
        }
    };

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
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                        <Header as='h2'>Average Review Score: {user.averageScore}</Header>
                        {!isOwner && (
                            <Button color={isBlocked ? 'green' : 'red'} onClick={handleBlockUnblock}>
                                {isBlocked ? 'Unblock User' : 'Block User'}
                            </Button>
                        )}
                        {isOwner && <Button primary onClick={() => navigate('/add-product')}>Add Product</Button>}
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
                                        Average Score: {product.score || 'N/A'} / 5
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
