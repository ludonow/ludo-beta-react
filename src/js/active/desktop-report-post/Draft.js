import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

import { StyledTextAreaWrapper } from './baseStyle';

// styled-components
const DraftWrapper = styled.div`
    display: inline-flex;
`;

// override material-ui
const textFieldStyle = {
    width: '50%'
};

const TextReportArea = ({
    onChange,
    text
}) => (
    <StyledTextAreaWrapper>
        <TextField
            hintText="輸入文字回報"
            multiLine
            onChange={onChange}
            rowsMax={5}
            style={textFieldStyle}
            defaultValue={text}
        />
    </StyledTextAreaWrapper>
);

const Draft = ({
    handleStepNext,
    handleTextChange,
    reportType,
    text
}) => {
    switch(reportType) {
        case 'image':
            return (
                <div>
                    <div>
                        empty image
                    </div>
                    <TextReportArea
                        onChange={handleTextChange}
                    />
                </div>
            );
        case 'text':
            return (
                <TextReportArea
                    onChange={handleTextChange}
                    text={text}
                />
            );
        case 'video':
            return (
                <div>
                    <div>
                        empty video
                    </div>
                    <TextReportArea
                        onChange={handleTextChange}
                    />
                </div>
            );
        default:
            return (
                <div>
                    please select a type
                </div>
            );
    }
};

export default Draft;
