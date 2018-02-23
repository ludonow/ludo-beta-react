import React, { PropTypes } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

// styled components
const LabelWrapper = styled.div`
    align-items: center;
    display: flex;
    width: 60px;
`;

const Wrapper = styled.div`
    display: inline-flex;
    width: 45%;
`;

const TextInput = ({
    handleTextChange,
    label,
    text,
}) => (
    <Wrapper>
        <LabelWrapper>
            {label}
        </LabelWrapper>
        <TextField
            defaultValue={text}
            fullWidth
            maxLength={50}
            onChange={handleTextChange}
        />
    </Wrapper>
);

TextInput.propTypes = {
    handleTextChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default TextInput;