import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <div style={styles.card}>
            <img src={product.imageUrl} alt={product.title} style={styles.image} />
            <h3>{product.title}</h3>
            <p>{product.explanation}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        explanation: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        textAlign: 'center',
        maxWidth: '200px'
    },
    image: {
        width: '100%',
        height: 'auto'
    }
};

export default ProductCard;
