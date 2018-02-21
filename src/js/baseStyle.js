import styled from 'styled-components';

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
