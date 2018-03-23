import React from 'react';
import PropTypes from 'prop-types';
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
    margin: 0 auto;
`;

const TextInput = ({
    defaultValue,
    handleKeyUp,
    handleTextChange,
    label,
    maxLength,
    value,
}) => (
    <Wrapper>
        <LabelWrapper>
            {label}
        </LabelWrapper>
        <TextField
            defaultValue={defaultValue}
            fullWidth
            maxLength={maxLength}
            onChange={handleTextChange}
            onKeyUp={handleKeyUp}
            value={value}
        />
    </Wrapper>
);

TextInput.propTypes = {
    handleKeyUp: PropTypes.func,
    handleTextChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    text: PropTypes.string,
};

TextInput.defaultProps = {
    maxLength: 50,
    text: '',
};

export default TextInput;