import React, { Component } from 'react';
import styled from 'styled-components';

import { StyledTextPreviewWrapper } from './baseStyle';

const Preview = ({
    image,
    reportType,
    text,
    video
}) => (
    <StyledTextPreviewWrapper>
        {text}
    </StyledTextPreviewWrapper>
);

export default Preview;
