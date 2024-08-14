import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

// AuthContext'i oluşturun
export const AuthContext = createContext();

// AuthProvider bileşeni
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    // Kullanıcının kimlik doğrulama durumunu ve userId'sini belirlemek için useEffect kullanılır
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUserId(decoded.userId); // JWT'den userId'yi alın
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
