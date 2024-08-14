import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
import { Container, Image, Header, Button, Grid, Segment } from 'semantic-ui-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

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
                        <Header as='h3'>Owner: {product.ownerUsername}</Header>
                        <Header as='h4'>Price: ${product.price}</Header>
                        <Header as='h4'>Average Score: {product.averageScore} / 5</Header>
                        <Button primary>Add to Bucket</Button>
                        <Button secondary>Add to Favorites</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Segment>
                            <Header as='h3'>Product Explanation</Header>
                            <p style={{color:"black"}}>{product.explanation}</p>
                            <Header as='h4'>Product Tags</Header>
                            <p style={{color:"black"}}>Category: {product.dtype}</p>
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
