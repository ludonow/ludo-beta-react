import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const Button = styled.button`
    align-items: center;
    cursor: pointer;
    display: flex;
    background: #2E968C;
    background-size: cover;
    border-left: none;
    border-radius: 50px;
    border-right: none;
    border-top: none;
    border-width: 2px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    height: 41px;
    justify-content: center;
    margin: 0 auto;
    width: 136px;

    &:disabled {
        background-color: rgb(240, 240, 240);
        border: none;
        cursor: not-allowed;
    }

    & > a {
        color: white;
        font-size: 20px;
        text-decoration: none;
    }
`;

const ReportButtonWrapper = styled.div`
    bottom: 0;
    font-family: "Exo", "Microsoft JhengHei";
    padding: 0.8rem 0;
    position: fixed;
    text-align: center;
    width: 100%;
    z-index: 2;
`;

/* components/report-form.scss */
const ReportButton = ({
    disabled,
    label,
    url
}) => (
    <ReportButtonWrapper>
        <Button
            disabled={disabled}
        >
            <Link to={url}>{label}</Link>
        </Button>
    </ReportButtonWrapper>
);

export default ReportButton;
