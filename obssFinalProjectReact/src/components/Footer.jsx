import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div>About Us</div>
            <div>Contact Us</div>
            <div>FAQ</div>
            <div>Company Name 2024 ©</div>
        </footer>
    );
};

const styles = {
    footer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        backgroundColor: '#333',
        color: '#fff',
        position: 'fixed',
        bottom: '0',
        width: '100%'
    }
};

export default Footer;
