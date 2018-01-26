import React from 'react';
import styled from 'styled-components';

const ButtonWithStyle = styled.button`
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#2E968C'};
    background-size: cover;
    border-radius: 50px;
    border-width: 2px;
    border-right: none;
    border-left: none;
    border-top: none;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    color: white;
    cursor: pointer; 
    display: flex;
    font-family: Microsoft JhengHei;
    font-weight: bold;
    font-size: 1rem;
    padding: 8px 30px;

    &:disabled {
        cursor: not-allowed;
        background-color: rgb(240, 240, 240);
        border: none;
    }
`;

const Button = ({
    backgroundColor,
    data,
    disabled,
    label,
    onClick
}) => (
    <ButtonWithStyle
        backgroundColor={backgroundColor}
        data-attr={data}
        disabled={disabled}
        onClick={onClick}
    >
        {label}
    </ButtonWithStyle>
);

export default Button;
