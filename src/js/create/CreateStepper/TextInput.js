import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: green;
`;

const TextInput = ({
    label,
}) => (
    <Wrapper>
        {label}
        <input type="text" />
    </Wrapper>
);

export default TextInput;