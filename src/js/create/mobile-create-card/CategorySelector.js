import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { categories, categoryIcons } from '../categories.js';

const usingCategories = categories['zh'];

export default class CategorySelector extends Component {
    constructor(props) {
        super(props);
    }

    /* components/_mobile-create.scss */
    render() {
        const {
            categoryId,
            handleCategoryChange
        } = this.props;

        return (
            <div className="category-step">
                <SelectField
                    floatingLabelText="種類"
                    fullWidth
                    value={categoryId}
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
                    <img src={categoryIcons[categoryId]} />
                </div>
            </div>
        );
    }
}

CategorySelector.propTypes = {
    categoryId: PropTypes.number.isRequired,
    handleCategoryChange: PropTypes.func.isRequired
};
