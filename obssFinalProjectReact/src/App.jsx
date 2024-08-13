import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
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
                </Route>
            </Routes>
        </Router>
    );
}
export default App;

