import React from 'react';
import { Container, Image, Button, Header, Icon, Label, Segment, Divider } from 'semantic-ui-react';

const ProductDetail = () => {
    const product = {
        name: 'Product Name',
        averageScore: 4.5,
        ownerUsername: 'OwnerUsername',
        price: 99.99,
        imageUrl: 'https://via.placeholder.com/150',
        explanation: 'This is the explanation of the product.',
        tags: ['Category', 'Type'],
        reviews: [
            {
                username: 'User1',
                title: 'Great Product!',
                description: 'Really enjoyed using this product. Highly recommended.',
                score: 5,
            },
            {
                username: 'User2',
                title: 'Not Bad',
                description: 'It works as expected, but I have seen better.',
                score: 3,
            },
        ],
    };

    return (
        <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <Segment>
                <div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
                    <Image src={product.imageUrl} size='medium' />
                    <div style={{ marginLeft: '20px', flexGrow: 1 }}>
                        <Header as='h2'>{product.name}</Header>
                        <p>Average Score: {product.averageScore} / 5</p>
                        <p>
                            <Icon name='user' />
                            {product.ownerUsername}
                        </p>
                        <p>
                            <Icon name='dollar sign' />
                            {product.price}
                        </p>
                        <div style={{ marginTop: '10px' }}>
                            <Button primary>Add to Card</Button>
                            <Button secondary>Recommend</Button>
                            <Button>Add to Favorites</Button>
                        </div>
                    </div>
                </div>
                <Divider />
                <div style={{ marginTop: '20px', color: 'black' }}>
                    <Header as='h3'>Product Explanation</Header>
                    <p>{product.explanation}</p>
                    <div style={{ marginTop: '10px' }}>
                        {product.tags.map((tag, index) => (
                            <Label key={index} color='blue' size='large'>
                                {tag}
                            </Label>
                        ))}
                    </div>
                </div>
                <Divider />
                <div style={{ marginTop: '20px' }}>
                    <Header as='h3'>Reviews</Header>
                    {product.reviews.map((review, index) => (
                        <Segment key={index} style={{ marginTop: '10px' }}>
                            <Header as='h4'>{review.title}</Header>
                            <p>{review.description}</p>
                            <p>
                                <strong>{review.username}</strong> - {review.score}/5
                            </p>
                        </Segment>
                    ))}
                    <Button icon labelPosition='left' primary style={{ marginTop: '20px' }}>
                        <Icon name='plus' />
                        Add Review
                    </Button>
                </div>
            </Segment>
        </Container>
    );
};

export default ProductDetail;
