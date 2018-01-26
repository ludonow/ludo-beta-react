import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

import Button from '../../components/Button';
import ToggleButton from './ToggleButton';
import cameraIconSrc from '../../../images/active/camera-icon.png';
import closeIconSrc from '../../../images/active/close-icon.png';
import videoIconSrc from '../../../images/active/video-icon.png';

// style components
const CloseIconWrapper = styled.div`
    left: 0;
    padding: 1vw;
    position: absolute;
    top: 0;

    img {
        cursor: pointer;
    }
`;

const DesktopReportPostWrapper = styled.div`
    position: fixed;
`;

const IconButtonListWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    margin-bottom: 50px;
    width: 100%;
`;

const IconButtonWrapper = styled.div`
    align-items: center;
    border-left: ${props => props.firstItem ? 'none' : '1px #C9C9C9 solid'};
    border-right: ${props => props.lastItem ? 'none' : '1px #C9C9C9 solid'};
    display: flex;
    height: 12.5vw;
    justify-content: center;
    width: 100%;
    
    img {
        cursor: pointer;
        height: 125px;
        width: 155px;
    }
`;

const SkipButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4vw;
`;

// override material-ui style
const contentStyle = {
    width: '60%',
    maxWidth: 'none'
};

const titleStyle = {
    fontFamily: 'Microsoft JhenHei',
    textAlign: 'center'
};


class DesktopReportPost extends Component {
    constructor() {
        super();
        this.state = {
            imageUrl: '',
            isReporting: false,
            open: false,
            text: '',
            type: '',
            videoUrl: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleOpen() {
        this.setState({ open: true });
    }

    render() {
        const actions = [
            <CloseIconWrapper>
                <img
                    onClick={this.handleClose}
                    src={closeIconSrc}
                />
            </CloseIconWrapper>,
            <IconButtonListWrapper>
                <IconButtonWrapper firstItem>
                    <img
                        onClick={this.handleClose}
                        src={cameraIconSrc}
                    />
                </IconButtonWrapper>
                <IconButtonWrapper lastItem>
                    <img
                        onClick={this.handleClose}
                        src={videoIconSrc}
                    />
                </IconButtonWrapper>
            </IconButtonListWrapper>,
            <SkipButtonWrapper>
                <Button
                    backgroundColor={'#B1B1B1'}
                    label="跳至文字回報"
                    onClick={this.handleClose}
                />
            </SkipButtonWrapper>
        ];

        return (
            <DesktopReportPostWrapper>
                <ToggleButton
                    onClick={this.handleOpen}
                    label="我要回報"
                />
                <Dialog
                    actions={actions}
                    contentStyle={contentStyle}
                    modal={true}
                    open={this.state.open}
                    title="輸入回報"
                    titleStyle={titleStyle}
                />
            </DesktopReportPostWrapper>
        );
    }
} 

export default DesktopReportPost;
