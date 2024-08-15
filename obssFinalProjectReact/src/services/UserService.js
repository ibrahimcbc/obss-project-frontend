import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const getUserById = async (userId) => {
    return await axios.get(`${BASE_URL}/${userId}`);
};

export const addToBlacklist = async (authUserId, blockedUserId) => {
    return await axios.put(`${BASE_URL}/${authUserId}/addToBlacklist/${blockedUserId}`);
};

export const removeFromBlacklist = async (authUserId, blockedUserId) => {
    return await axios.put(`${BASE_URL}/${authUserId}/removeFromBlacklist/${blockedUserId}`);
};

export const checkIfBlocked = async (authUserId,blockedUserId) => {
    return await axios.get(`${BASE_URL}/${authUserId}/isBlocked/${blockedUserId}`);
};