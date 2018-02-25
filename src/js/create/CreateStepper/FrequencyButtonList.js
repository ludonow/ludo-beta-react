import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const labelList = [
    '每一天回報',
    '每兩天回報',
    '每三天回報',
];

const Wrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    margin: 0 auto;
    width: 60%;
`;

const FrequencyButtonList = (
) => (
    <Wrapper>
        {
            labelList.map((label, index) => (
                <Button
                    backgroundColor="white"
                    border="1px solid #ffc645"
                    boxShadow="none"
                    fontSize="14px"
                    hoverBackgroundColor="#ffc645"
                    hoverTextColor="white"
                    label={label}
                    margin="0 15px"
                    padding="8px 15px"
                    textColor="#ffc645"
                    width="auto"
                />
            ))
        }
    </Wrapper>
);

export default FrequencyButtonList;
