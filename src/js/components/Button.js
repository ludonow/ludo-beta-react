import React from 'react';
import styled from 'styled-components';

const ButtonWithStyle = styled.button`
    align-items: center;
    background-color: #2E968C;
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

const ButtonWrapper = styled.div`
    bottom: 0;
    display: flex;
    justify-content: center;
    margin: 30px auto;
    position: fixed;
    width: 1130px;
    z-index: 2;
`;

const Button = ({
  onClick,
  text
}) => (
  <ButtonWrapper>
    <ButtonWithStyle onClick={onClick}>
      {text}
    </ButtonWithStyle>
  </ButtonWrapper>
);

export default Button;
