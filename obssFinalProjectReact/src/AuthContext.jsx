import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// AuthContext'i oluşturun
export const AuthContext = createContext();

// AuthProvider bileşeni
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const localToken = localStorage.getItem('token');
        if (localToken) {
            try {
                console.log("babammm");
                const decoded = jwtDecode(localToken);
                setIsAuthenticated(true);
                setUserId(decoded.userId); // JWT'den userId'yi alın
                setRoles(decoded.roles || []); // JWT'den rolleri alın
                setToken(localToken);
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
    };

    fetchToken(); // Asenkron işlemi çağır
}, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, roles, token, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
