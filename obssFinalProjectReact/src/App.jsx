import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import ProductDetail from './components/ProductDetail';
import 'semantic-ui-css/semantic.min.css';
import AddProduct from './components/AddProduct';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


function App() {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="/add-product" element={<AddProduct userId={userId} />} />
                    <Route path="products/users/:userId" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;

