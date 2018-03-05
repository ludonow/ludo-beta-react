import { Link } from 'react-router';
import styled from 'styled-components';

export const ButtonListWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2vw 0;

    button {
        margin: 0 30px;
    }
`;

export const CardListWrapper = styled.div`
    width: 1130px;
    @media (max-width: 560px) {
        width: 226px
    }

    @media (min-width: 560px) and (max-width: 704px) {
        width: 554px;
    }

    @media (min-width: 705px) and (max-width: 944px) {
        width: 678px;
    }

    @media (min-width: 945px) and (max-width: 1174px) {
        width: 904px;
    }

    @media (min-width: 1175px) {
        width: 1130px;
    }
`;

/**
 * custom scroll bar style
 * src: https://gist.github.com/devinrhode2/2573411
 */
export const CustomScrollBarCSS = `
    /* Turn on custom 8px wide scrollbar */
    ::-webkit-scrollbar {
        width: 8px; /* 1px wider than Lion. */
        /* This is more usable for users trying to click it. */
        background-color: rgba(0,0,0,0);
        -webkit-border-radius: 100px;
    }
    /* hover effect for both scrollbar area, and scrollbar 'thumb' */
    ::-webkit-scrollbar:hover {
        background-color: rgba(0, 0, 0, 0.09);
    }

    /* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
    ::-webkit-scrollbar-thumb:vertical {
        /* This is the EXACT color of Mac OS scrollbars. 
        Yes, I pulled out digital color meter */
        background: rgba(0,0,0,0.5);
        -webkit-border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb:vertical:active {
        background: rgba(0,0,0,0.61); /* Some darker color when you click it */
        -webkit-border-radius: 100px;
    }
`;

export const StyledAnchor = styled.a`
    color: white;
    text-decoration: none;
`;

export const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;
