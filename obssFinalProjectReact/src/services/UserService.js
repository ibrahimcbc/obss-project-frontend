import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const getUserById = async (userId) => {
    return await axios.get(`${BASE_URL}/${userId}`);
};