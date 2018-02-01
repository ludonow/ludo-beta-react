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
    color: ${props => props.textColor ? props.textColor : '#FFFFFF'};;
    cursor: pointer; 
    display: flex;
    font-family: Microsoft JhengHei;
    font-weight: bold;
    font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
    justify-content: center;
    margin: 0 auto;
    padding: 8px 30px;
    width: ${props => props.width ? props.width : '140px'};

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
    fontSize,
    label,
    onClick,
    textColor
}) => (
    <ButtonWithStyle
        backgroundColor={backgroundColor}
        data-payload={data}
        disabled={disabled}
        fontSize={fontSize}
        onClick={onClick}
        textColor={textColor}
    >
        {label}
    </ButtonWithStyle>
);

export default Button;
