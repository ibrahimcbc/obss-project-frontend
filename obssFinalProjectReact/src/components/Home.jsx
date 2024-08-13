import React, { useState, useEffect } from 'react';
import { Card, Image, Button, Grid, Container } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
const Home = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const category = query.get('category');
        const type = query.get('type');

        const fetchProducts = async () => {
            try {
                let response;
        
                if (category && type) {
                    // Eğer hem kategori hem de tür seçilmişse
                    if (category === 'clothing') {
                        response = await ProductService.getClothingByCategory(type);
                    } else if (category === 'electronics') {
                        response = await ProductService.getElectronicsByCategory(type);
                    } else if (category === 'books') {
                        response = await ProductService.getBooksByCategory(type);
                    }
                } else if (category) {
                    // Sadece kategori seçilmişse
                    if (category === 'clothing') {
                        response = await ProductService.getAllClothing();
                    } else if (category === 'electronics') {
                        response = await ProductService.getAllElectronics();
                    } else if (category === 'books') {
                        response = await ProductService.getAllBooks();
                    }
                } else {
                    response = await ProductService.getAllProducts();
                }
        
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.response);
            }
        };
        

        fetchProducts();
    }, [location]);

    return (
        <Container style={{ padding: '20px' }}>
            <h2>Product List</h2>
            <Grid>
                <Grid.Row columns={4}>
                    {products.map(product => (
                        <Grid.Column key={product.id} style={{ marginBottom: '20px' }}>
                            <Card>
                                <Image src={product.imageUrl || 'https://via.placeholder.com/150'} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{product.title}</Card.Header>
                                    <Card.Meta>{product.category}</Card.Meta>
                                    <Card.Meta>${product.price}</Card.Meta>
                                    <Card.Description>
                                        Average Score: {product.averageScore || 'N/A'} / 5
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button primary fluid>View Details</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Home;
