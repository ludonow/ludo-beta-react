import React, { Component } from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { grey500 } from 'material-ui/styles/colors';

const Tag = ({
    handleTagDelete,
    id,
    tag
}) => (
    <span
        className="tag"
    >
        #{tag}
        <DeleteIcon
            color={grey500}
            data-id={id}
            onTouchTap={handleTagDelete}
        />
    </span>
);

export default Tag;