import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

// styled-components
const EmptyDraftWrapper = styled.div`
    display: inline-flex;
`;

const StyledTextAreaWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

// override material-ui
const textFieldStyle = {
    width: '50%'
};


const TextReportArea = ({ onChange }) => (
    <StyledTextAreaWrapper>
        <TextField
            hintText="輸入文字回報"
            multiLine
            onChange={onChange}
            rowsMax={5}
            style={textFieldStyle}
        />
    </StyledTextAreaWrapper>
);

const EmptyDraft = ({
    handleStepNext,
    handleTextChange,
    reportType
}) => {
    switch(reportType) {
        case 'image':
            return (
                <div>
                    <TextReportArea
                        onChange={handleTextChange}
                    />
                    <div>
                        empty text
                    </div>
                </div>
            );
        case 'text':
            return (
                <TextReportArea
                    onChange={handleTextChange}
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

export default EmptyDraft;
