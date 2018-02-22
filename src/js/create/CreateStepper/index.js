import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import Content from './Content';
import StepButtonList from './StepButtonList';
import StepperCloseIcon from '../../components/StepperCloseIcon';

const initialState = {
    imageLocation: '',
    images: [],
    isDiscardAlertOpen: false,
    isEditing: false,
    isPreviewButtonDisabled: true,
    isSubmitting: false,
    open: true,
    step: 0,
    text: '',
    type: '',
    resizedHeight: 250,
    resizedWidth: 250,
    video: '',
};

const titles = [
    '標題與回報頻率',
    '卡片形式選擇',
    '卡片內容簡介',
    '加分回報時段'
];

// styled components
const Wrapper = styled.div`
    background-color: white;
`;

// override material-ui style
const contentStyle = {
    width: '60%',
    maxWidth: 'none'
};

const titleStyle = {
    fontFamily: 'Microsoft JhengHei',
    textAlign: 'center'
};

class CreateStepper extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        // this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleCloseClick() {
        const { isEditing } = this.state;
        if (isEditing) {
            this.setState({ isDiscardAlertOpen: true });
        } else {
            this.handleDialogClose();
        }
    }

    handleDialogClose() {
        this.setState({
            ...initialState,
            open: false,
        });
    }

    handleStepChange(variation) {
        this.setState(
            prevState => ({
                step: prevState.step + variation
            })
        );
    }

    handleStepNext() {
        this.handleStepChange(1);
    }

    handleStepPrev() {
        this.handleStepChange(-1);
    }

    handleSubmit() {
        console.log('submit');
    }

    handleTypeSelect(event) {
        const type = event.currentTarget.dataset.payload;
        this.setState({
            type,
            step: 2,
        });
    }

    render() {
        const {
            isPreviewButtonDisabled,
            isSubmitting,
            open,
            step,
        } = this.state;

        return (
            <Wrapper>
                <Dialog
                    contentStyle={contentStyle}
                    onRequestClose={this.handleCloseClick}
                    open={open}
                    title={titles[step]}
                    titleStyle={titleStyle}
                >
                    <StepperCloseIcon handleCloseClick={this.handleCloseClick} />
                    <Content
                        step={step}
                    />
                    <StepButtonList
                        handleDialogClose={this.handleDialogClose}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleSubmit={this.handleSubmit}
                        handleTypeSelect={this.handleTypeSelect}
                        isPreviewButtonDisabled={isPreviewButtonDisabled}
                        isSubmitting={isSubmitting}
                        step={step}
                    />
                </Dialog>
            </Wrapper>
        );
    }
}

export default CreateStepper;
