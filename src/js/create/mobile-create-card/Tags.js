import React, { Component } from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { grey200 } from 'material-ui/styles/colors';

const Tag = ({
    handleTagDelete,
    id,
    tag
}) => (
    <span className="tag">
        <span className="tag-text">
            #{tag}
        </span>
        <div className="delete-button-container">
            <DeleteIcon
                color={grey200}
                data-id={id}
                onTouchTap={handleTagDelete}
            />
        </div>
    </span>
);

const Tags = ({
    handleTagDelete,
    tags
}) => {
    return (
        <div className="tag-container">
            {
                tags ?
                    tags.map((tag, index) => (
                        <Tag
                            handleTagDelete={handleTagDelete}
                            id={index}
                            key={`ludo-tag-${index}`}
                            tag={tag}
                        />
                    ))
                :
                    null
            }
        </div>
    );
}

export default Tags;
