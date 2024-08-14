import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import ProductDetail from './components/ProductDetail';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="products/users/:userId" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;

