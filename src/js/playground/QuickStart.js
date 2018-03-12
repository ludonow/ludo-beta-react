import React from 'react';
import { Link } from "react-router";
import styled from 'styled-components';

import { baseUrl } from '../baseurl-config';
import createIcon from '../../images/create.png';

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`;

const QuickStartCard = styled.div`
    background-color: white;
    box-shadow: 0px, 1px, 2px, 0px, rgba(0, 0, 0, 0.2);
    height: 60%;
    padding: 5px 0;
    width: 200px;

    &:hover {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.19);
        transition-duration: 0.3s;
    }
`;

const QuickStartImageWrapper = styled.div`
    align-items: center;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.8);
    color: black;
    display: flex;
    height: 50px;
    justify-content: center;
    line-height: 50px;
    margin: 0 auto;
    text-align: center;
    width: 50px;
`;

/* components/_card.scss */
const QuickStart = () => (
    <div className="grid-item">
        <StyledLink to={`${baseUrl}/create`}>
            <QuickStartCard className="card--playground">
                <QuickStartImageWrapper>
                    <img src={createIcon} />
                </QuickStartImageWrapper>
            </QuickStartCard>
        </StyledLink>
    </div>
);

export default QuickStart;
