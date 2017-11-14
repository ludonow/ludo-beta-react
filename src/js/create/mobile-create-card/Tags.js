import React, { Component } from 'react';
import Tag from './Tag';

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
