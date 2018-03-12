import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { cyan800, deepOrange200, grey800 } from 'material-ui/styles/colors';

const RoundRadiusTag = styled.span`
    border-radius: 20px;
    padding: 8px 20px;
    background-color: ${cyan800};
    color: white;
    font-size: 0.8rem;
`;

const CardContentWrapper = styled.div`
    padding: 5px 30px;
    color: white;
`;

const CardInterval = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 30px 0;
    text-align: center;
`;

const CardIntroduction = styled.div`
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.3;
    margin-bottom: 70px;
    white-space: pre-line;
`;

const CardTitle = styled.div`
    margin: 35px 0;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
`;

const CardTags = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 15px 0;
    text-align: center;
`;

const CardTag = RoundRadiusTag.extend`
    display: flex;
    align-items: center;
    margin: 5px;
`;

const IntervalTag = RoundRadiusTag.extend`
    display: flex;
    align-items: center;
    margin: 5px;
    background-color: ${deepOrange200};
`;

const MobileCardContent = ({
    interval,
    introduction,
    tags,
    title
}) => (
    <CardContentWrapper>
        <CardTitle>
            {title}
        </CardTitle>
        <CardTags>
            {
                tags.map((tag, index) => (
                    <CardTag
                        key={`introducton-${index}`}
                    >
                        #{tag}
                    </CardTag>
                ))
            }
        </CardTags>
        <CardInterval>
            <IntervalTag>每{interval}天回報</IntervalTag>
        </CardInterval>
        <CardIntroduction>
            {introduction}
        </CardIntroduction>
    </CardContentWrapper>
);

MobileCardContent.propTypes = {
    interval: PropTypes.number.isRequired,
    introduction: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired
};

export default MobileCardContent;
