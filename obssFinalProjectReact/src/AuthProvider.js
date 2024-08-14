import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUserId(decoded.userId);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
