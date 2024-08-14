import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getAllProducts = async () => {
    return await axios.get(`${BASE_URL}/products`);
};

export const getAllClothing = async () => {
    return await axios.get(`${BASE_URL}/clothing`);
};

export const getAllElectronics = async () => {
    return await axios.get(`${BASE_URL}/electronics`);
};

export const getAllBooks = async () => {
    return await axios.get(`${BASE_URL}/books`);
};

export const getClothingByCategory = async (category) => {
    return await axios.get(`${BASE_URL}/clothing/category/${category}`);
};

export const getElectronicsByCategory = async (category) => {
    return await axios.get(`${BASE_URL}/electronics/category/${category}`);
};

export const getBooksByCategory = async (category) => {
    return await axios.get(`${BASE_URL}/books/category/${category}`);
};

export const sortProducts = async ({ sortBy, order }) => {
    return await axios.get(`${BASE_URL}/products/sort?sortBy=${sortBy}&order=${order}`);
};

export const getProductById = async (id) => {
    return await axios.get(`${BASE_URL}/products/${id}`);
};