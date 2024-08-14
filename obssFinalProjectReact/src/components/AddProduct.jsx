import React, { useState } from 'react';
import { Form, Button, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';

const AddProduct = ({ userId }) => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        category: '',
        property1: '',
        property2: '',
        property3: '',
        amount: '',
        price: '',
        discount: '',
        imageUrl: ''
    });

    const categoryOptions = [
        { key: 'electronic', text: 'Electronic', value: 'electronic' },
        { key: 'clothing', text: 'Clothing', value: 'clothing' },
        { key: 'book', text: 'Book', value: 'book' }
    ];

    const discountOptions = [
        { key: 'none', text: 'NONE', value: 'NONE' },
        { key: '2of3', text: '2OF3', value: '2OF3' },
        { key: '20percent', text: '20PERCENT', value: '20PERCENT' },
        { key: '3of5', text: '3OF5', value: '3OF5' }
    ];

    const handleCategoryChange = (e, { value }) => {
        setProductData({ ...productData, category: value });
    };

    const handleInputChange = (e, { name, value }) => {
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async () => {
        const apiUrl = `http://localhost:8080/api/${productData.category}/${userId}`;
        try {
            const response = await axios.post(apiUrl, productData);
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const renderProperties = () => {
        switch (productData.category) {
            case 'electronic':
                return (
                    <>
                        <Form.Input
                            label="Brand"
                            name="property1"
                            placeholder="Brand"
                            value={productData.property1}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Storage"
                            name="property2"
                            placeholder="Storage"
                            value={productData.property2}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="RAM"
                            name="property3"
                            placeholder="RAM"
                            value={productData.property3}
                            onChange={handleInputChange}
                        />
                    </>
                );
            case 'clothing':
                return (
                    <>
                        <Form.Input
                            label="Brand"
                            name="property1"
                            placeholder="Brand"
                            value={productData.property1}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Size"
                            name="property2"
                            placeholder="Size"
                            value={productData.property2}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Color"
                            name="property3"
                            placeholder="Color"
                            value={productData.property3}
                            onChange={handleInputChange}
                        />
                    </>
                );
            case 'book':
                return (
                    <>
                        <Form.Input
                            label="Author"
                            name="property1"
                            placeholder="Author"
                            value={productData.property1}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Genre"
                            name="property2"
                            placeholder="Genre"
                            value={productData.property2}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Page Number"
                            name="property3"
                            placeholder="Page Number"
                            value={productData.property3}
                            onChange={handleInputChange}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input
                label="Product Name"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleInputChange}
            />
            <Form.TextArea
                label="Product Description"
                name="description"
                placeholder="Product Description"
                value={productData.description}
                onChange={handleInputChange}
            />
            <Form.Input
                label="Image URL"
                name="imageUrl"
                placeholder="Image URL"
                value={productData.imageUrl}
                onChange={handleInputChange}
            />
            <Dropdown
                placeholder="Select Category"
                fluid
                selection
                options={categoryOptions}
                onChange={handleCategoryChange}
            />
            {renderProperties()}
            <Form.Input
                label="Amount"
                name="amount"
                placeholder="Amount"
                value={productData.amount}
                onChange={handleInputChange}
            />
            <Form.Input
                label="Price"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleInputChange}
            />
            <Dropdown
                placeholder="Select Discount"
                fluid
                selection
                options={discountOptions}
                name="discount"
                onChange={handleInputChange}
            />
            <Button type="submit" primary>
                Add Product
            </Button>
        </Form>
    );
};

export default AddProduct;
