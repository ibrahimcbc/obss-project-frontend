import React, { useState, useEffect , useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
import { Container, Image, Header, Button, Grid, Segment } from 'semantic-ui-react';
import { AuthContext } from '../AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const {userId} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const checkIfFavorite = async () => {
            try {
                if (!userId) {
                    setIsFavorite(false);
                    return;
                }
                const response = await ProductService.checkIfFavorite(id, userId);
                setIsFavorite(response.data);
            } catch (error) {
                console.error('Error checking if favorite:', error);
            }
        };
        
        fetchProduct();
        checkIfFavorite();
    }, [id]);

    const handleFavoriteToggle = async () => {
        try {
            if(!userId) {
                navigate('/login');
            }
            else{
                if (isFavorite) {
                    await ProductService.removeFromFavorites(id, userId);
                } else {
                    await ProductService.addToFavorites(id, userId);
                }
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container style={{ padding: '20px' }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image src={product.imageUrl || 'https://via.placeholder.com/150'} size='large' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as='h1'>{product.title}</Header>
                        <Header as='h3'>Owner: {product.userId}</Header>
                        <Header as='h4'>Price: ${product.price}</Header>
                        <Header as='h4'>Average Score: {product.score} / 5</Header>
                        <Button primary>Add to Bucket</Button>
                        <Button secondary onClick={handleFavoriteToggle}>
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header as='h3'>Product Explanation</Header>
                            <p style={{color:"black"}}>{product.explanation}</p>
                            <p style={{color:"black"}}>Category: {product.category}</p>
                            <p style={{color:"black"}}>Type: {product.category}</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header as='h3'>Reviews</Header>
                            {/* Review componentleri buraya gelecek */}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
