import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// AuthContext'i oluşturun
export const AuthContext = createContext();

// AuthProvider bileşeni
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUserId(decoded.userId); // JWT'den userId'yi alın
                setRoles(decoded.roles || []); // JWT'den rolleri alın
            } catch (error) {
                console.error('Invalid token:', error);
                setIsAuthenticated(false);
                setUserId(null);
                setRoles([]);
            }
        } else {
            setIsAuthenticated(false);
            setUserId(null);
            setRoles([]);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, roles }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
