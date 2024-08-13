import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Icon } from 'semantic-ui-react';

const Body = () => {
    // Hardcoded products
    const products = [
        { id: 1, title: 'Product 1', explanation: 'This is product 1', price: 10, imageUrl: 'https://via.placeholder.com/150', averageScore: 4.2},
        { id: 2, title: 'Product 2', explanation: 'This is product 2', price: 20, imageUrl: 'https://via.placeholder.com/150', averageScore: 2.5 },
        { id: 3, title: 'Product 3', explanation: 'This is product 3', price: 30, imageUrl: 'https://via.placeholder.com/150', averageScore: 1.3 },
        { id: 4, title: 'Product 4', explanation: 'This is product 4', price: 40, imageUrl: 'https://via.placeholder.com/150', averageScore: 5.0 }
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card.Group>
                {products.map((product) => (
                    <Card key={product.id} as={Link} to={`/product/${product.id}`}>
                        <Image src={product.imageUrl} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>${product.price}</span>
                            </Card.Meta>
                            <Card.Description>
                                Average Score: {product.averageScore} / 5
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    );
};

const styles = {
    body: {
        padding: '20px'
    },
    sortButton: {
        marginBottom: '20px'
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
    }
};

export default Body;
