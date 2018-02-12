import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { categories, categoryIcons } from '../categories.js';

const usingCategories = categories['zh'];

const CategorySelector = ({
    categoryId,
    handleCategoryChange
}) => (
    <div className="category-step">
        <SelectField
            fullWidth
            value={categoryId-1}
            onChange={handleCategoryChange}
        >
            {
                usingCategories.map((category, categoryIndex) => {
                    return (
                        <MenuItem
                            key={categoryIndex}
                            primaryText={category}
                            value={categoryIndex}
                        />
                    );
                })
            }
        </SelectField>
        <div className="category-icon">
            <img src={categoryIcons[categoryId-1]} />
        </div>
    </div>
)

CategorySelector.propTypes = {
    categoryId: PropTypes.number.isRequired,
    handleCategoryChange: PropTypes.func.isRequired
};

export default CategorySelector;
