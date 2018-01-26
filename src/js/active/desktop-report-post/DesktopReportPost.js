import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

import Button from '../../components/Button';
import Content from './Content';
import ToggleButton from './ToggleButton';
import closeIconSrc from '../../../images/active/close-icon.png';

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
            discardAlertOpen: false,
            imageUrl: '',
            isReporting: false,
            open: false,
            step: 0,
            text: '',
            reportType: '',
            videoUrl: ''
        };
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
    }

    handleDialogClose() {
        this.setState({ open: false });
    }

    handleDialogOpen() {
        this.setState({
            open: true,
            step: 0
        });
    }

    handleStepNext(event) {
        const { attr } = event.target.dataset;
        this.setState(
            prevState => ({
                step: prevState.step + 1,
                reportType: attr
            })
        );
    }

    handleStepPrev() {
        this.setState(
            prevState => ({
                step: prevState.step - 1
            })
        );
    }

    render() {
        const {
            open,
            step,
            reportType
        } = this.state;
        return (
            <DesktopReportPostWrapper>
                <ToggleButton
                    onClick={this.handleDialogOpen}
                    label="我要回報"
                />
                <Dialog
                    contentStyle={contentStyle}
                    modal={true}
                    open={open}
                    title="輸入回報"
                    titleStyle={titleStyle}
                >
                    <CloseIconWrapper>
                        <img
                            onClick={this.handleDialogClose}
                            src={closeIconSrc}
                            title="關閉"
                        />
                    </CloseIconWrapper>
                    <Content
                        handleDialogClose={this.handleDialogClose}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        step={step}
                        reportType={reportType}
                    />
                    <SkipButtonWrapper>
                        <Button
                            backgroundColor={'#B1B1B1'}
                            data="text"
                            label="跳至文字回報"
                            onClick={this.handleStepNext}
                        />
                    </SkipButtonWrapper>
                </Dialog>
            </DesktopReportPostWrapper>
        );
    }
} 

export default DesktopReportPost;
