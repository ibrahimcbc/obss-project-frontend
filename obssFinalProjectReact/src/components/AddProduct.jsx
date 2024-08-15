import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const AddProduct = () => {
    const { userId } = useContext(AuthContext);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [explanation, setExplanation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [discountTag, setDiscountTag] = useState('');
    const [property1, setProperty1] = useState('');
    const [property2, setProperty2] = useState('');
    const [property3, setProperty3] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        let productData = {
            title,
            explanation,
            imageUrl,
            price,
            amount,
            discountTag: [{ name: discountTag }],
            category,
            type, // Type is included in product data
        };

        switch (category) {
            case 'electronics':
                productData = {
                    ...productData,
                    brand: property1,
                    storage: property2,
                    ram: property3,
                };
                break;
            case 'clothing':
                productData = {
                    ...productData,
                    brand: property1,
                    size: property2,
                    color: property3,
                };
                break;
            case 'books':
                productData = {
                    ...productData,
                    author: property1,
                    genre: property2,
                    pageNumber: property3,
                };
                break;
            default:
                break;
        }

        try {
            let apiUrl = `http://localhost:8080/api/products/${category}/${userId}`;
            await axios.post(apiUrl, productData);
            navigate('/');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('There was an error adding the product.');
        }
    };

    const getTypeOptions = () => {
        switch (category) {
            case 'electronics':
                return [
                    { key: 'laptop', text: 'Laptop', value: 'laptop' },
                    { key: 'cellphone', text: 'CellPhone', value: 'cellphone' },
                    { key: 'tablet', text: 'Tablet', value: 'tablet' },
                ];
            case 'clothing':
                return [
                    { key: 'shorts', text: 'Shorts', value: 'shorts' },
                    { key: 'tshirt', text: 'T-Shirt', value: 'tshirt' },
                    { key: 'pants', text: 'Pants', value: 'pants' },
                    { key: 'jacket', text: 'Jacket', value: 'jacket' },
                ];
            case 'books':
                return [
                    { key: 'novel', text: 'Novel', value: 'novel' },
                    { key: 'story', text: 'Story', value: 'story' },
                    { key: 'biography', text: 'Biography', value: 'biography' },
                    { key: 'magazine', text: 'Magazine', value: 'magazine' },
                    { key: 'education', text: 'Education', value: 'education' },
                ];
            default:
                return [];
        }
    };

    const getPropertyLabels = () => {
        switch (category) {
            case 'electronics':
                return ['Brand', 'Storage', 'RAM'];
            case 'clothing':
                return ['Brand', 'Size', 'Color'];
            case 'books':
                return ['Author', 'Genre', 'Page Number'];
            default:
                return [];
        }
    };

    return (
        <Container>
            <Form>
                <Form.Input
                    label="Product Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.TextArea
                    label="Explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                />
                <Form.Input
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <Form.Input
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Form.Input
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Form.Select
                    label="Category"
                    options={[
                        { key: 'electronics', text: 'Electronics', value: 'electronics' },
                        { key: 'clothing', text: 'Clothing', value: 'clothing' },
                        { key: 'books', text: 'Books', value: 'books' },
                    ]}
                    value={category}
                    onChange={(e, { value }) => setCategory(value)}
                />
                {category && (
                    <>
                        <Form.Select
                            label="Type"
                            options={getTypeOptions()}
                            value={type}
                            onChange={(e, { value }) => setType(value)}
                        />
                        <Form.Input
                            label={getPropertyLabels()[0]}
                            value={property1}
                            onChange={(e) => setProperty1(e.target.value)}
                        />
                        <Form.Input
                            label={getPropertyLabels()[1]}
                            value={property2}
                            onChange={(e) => setProperty2(e.target.value)}
                        />
                        <Form.Input
                            label={getPropertyLabels()[2]}
                            value={property3}
                            onChange={(e) => setProperty3(e.target.value)}
                        />
                    </>
                )}
                <Form.Select
                    label="Discount Tag"
                    options={[
                        { key: 'none', text: 'NONE', value: 'NONE' },
                        { key: '2of3', text: '2OF3', value: '2OF3' },
                        { key: '20percent', text: '20PERCENT', value: '20PERCENT' },
                        { key: '3of5', text: '3OF5', value: '3OF5' },
                    ]}
                    value={discountTag}
                    onChange={(e, { value }) => setDiscountTag(value)}
                />
                <Button primary onClick={handleSubmit}>
                    Add Product
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
