import React, { useState, useEffect } from 'react';
import { Card, Image, Button, Grid, Container, Dropdown } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const location = useLocation();
    const navigate= useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const category = query.get('category');
        const type = query.get('type');

        const fetchProducts = async () => {
            try {
                let response;
                if (category && type) {
                    if (category === 'clothing') {
                        response = await ProductService.getClothingByCategory(type);
                    } else if (category === 'electronics') {
                        response = await ProductService.getElectronicsByCategory(type);
                    } else if (category === 'books') {
                        response = await ProductService.getBooksByCategory(type);
                    }
                } else if (category) {
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

                if (sortOption) {
                    response = await ProductService.sortProducts(sortOption);
                }
        
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.response);
            }
        };
        

        fetchProducts();
    }, [location, sortOption]);

    const sortOptions = [
        { key: 'price-asc', text: 'Price: Low to High', value: { sortBy: 'price', order: 'asc' } },
        { key: 'price-desc', text: 'Price: High to Low', value: { sortBy: 'price', order: 'desc' } },
        { key: 'score-asc', text: 'Score: Low to High', value: { sortBy: 'averageScore', order: 'asc' } },
        { key: 'score-desc', text: 'Score: High to Low', value: { sortBy: 'averageScore', order: 'desc' } },
    ];

    const handleSortChange = (e, { value }) => {
        setSortOption(value);
    };

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };


    return (
        <Container style={{ padding: '20px' }}>
            <Dropdown
                placeholder='Sort by'
                selection
                options={sortOptions}
                onChange={handleSortChange}
                style={{ marginBottom: '20px' }}
            />
            <Grid>
                <Grid.Row columns={4}>
                    {products.map(product => (
                        <Grid.Column key={product.id} style={{ marginBottom: '20px' }}>
                            <Card onClick={() => handleCardClick(product.id)}>
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
