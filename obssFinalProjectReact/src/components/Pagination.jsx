import React from 'react';

const Pagination = () => {
    return (
        <div style={styles.pagination}>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
        </div>
    );
};

const styles = {
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    }
};

export default Pagination;
