import React, { Component } from 'react';
import styled from 'styled-components';

import GuideIcon from '../../images/guide_icon.svg';

const GuideWrapper = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 20px;
    cursor: pointer;

    img {
        height: 40px;
        width: 40px;
    }
`;

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guideImageName: '',
            isGuideOpen: false
        };
        this.handleGuideOpen = this.handleGuideOpen.bind(this);
    }

    handleGuideOpen() {
        this.setState({
            isGuideOpen: true
        });
    }

    render() {
        return (
            <GuideWrapper
                onTouchTap={this.handleGuideOpen}
            >
                <img src={GuideIcon} />
            </GuideWrapper>
        );
    }
}
