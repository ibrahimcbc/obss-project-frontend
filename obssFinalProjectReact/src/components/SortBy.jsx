import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const SortBy = ({ onSortChange }) => {
    const sortOptions = [
        { key: 'price-asc', text: 'Price: Low to High', value: 'price-asc' },
        { key: 'price-desc', text: 'Price: High to Low', value: 'price-desc' },
        { key: 'score-asc', text: 'Score: Low to High', value: 'score-asc' },
        { key: 'score-desc', text: 'Score: High to Low', value: 'score-desc' },
    ];

    return (
        <Dropdown
            placeholder='Sort by'
            selection
            options={sortOptions}
            onChange={(e, { value }) => onSortChange(value)}
        />
    );
};

export default SortBy;
