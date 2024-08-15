import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getAllProducts = async () => {
    return await axios.get(`${BASE_URL}/products`);
};

export const getAllClothing = async () => {
    return await axios.get(`${BASE_URL}/clothing`);
};

export const getAllElectronics = async () => {
    return await axios.get(`${BASE_URL}/electronic`);
};

export const getAllBooks = async () => {
    return await axios.get(`${BASE_URL}/book`);
};

export const getClothingByCategory = async (category) => {
    return await axios.get(`${BASE_URL}/clothing/category/${category}`);
};

export const getElectronicsByCategory = async (category) => {
    return await axios.get(`${BASE_URL}/electronic/category/${category}`);
};

export const getBooksByCategory = async (category) => {
    return await axios.get(`${BASE_URL}/book/category/${category}`);
};

export const sortProducts = async (sortOption) => { // Destructuring yerine doğrudan al
    console.log('sorting:', sortOption); // Debugging line
    if (!sortOption) throw new Error('sortOption is undefined'); // Hata fırlat
    const [sortBy, order] = sortOption.split('-'); // Destructuring kullanarak ayır
    return await axios.get(`${BASE_URL}/products/sort?sortBy=${sortBy}&order=${order}`);
};

export const getProductById = async (id) => {
    return await axios.get(`${BASE_URL}/products/${id}`);
};

export const getProductsByUserId = async (userId) => {
    return await axios.get(`${BASE_URL}/products/users/${userId}`);
};