import React from 'react';
import styled from 'styled-components';

import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import { grey200 } from 'material-ui/styles/colors';
import { CustomScrollBarCSS } from '../../../../baseStyle';

// styled components
const DeleteIconWrapper = styled.div`
    align-items: center;
    display: flex;
`;

const TagListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    max-height: 70px;
    overflow: auto;
    width: 50%;
    ${CustomScrollBarCSS}
`;

const TagWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    display: inline-flex;
    margin: 5px;
`;

const TagText = styled.div`
    display: inline-flex;
    color: white;
    overflow: auto;
    padding: 5px;
    ${CustomScrollBarCSS}
`;

// override material-ui
const deleteIconStyle = {
    height: '20px',
    width: '20px',
};

const Tag = ({
    handleTagDelete,
    id,
    text,
}) => (
    <TagWrapper>
        <TagText>
            #{text}
        </TagText>
        <DeleteIconWrapper>
            <DeleteIcon
                color={grey200}
                data-id={id}
                onTouchTap={handleTagDelete}
                style={deleteIconStyle}
            />
        </DeleteIconWrapper>
    </TagWrapper>
);

const TagList = ({
    handleTagDelete,
    tagList,
}) => {
    return (
        <TagListWrapper>
            {
                tagList ?
                    tagList.map((tag, index) => (
                        <Tag
                            handleTagDelete={handleTagDelete}
                            id={index}
                            key={`create-card-tag-${index}`}
                            text={tag}
                        />
                    ))
                : null
            }
        </TagListWrapper>
    );
}

export default TagList;