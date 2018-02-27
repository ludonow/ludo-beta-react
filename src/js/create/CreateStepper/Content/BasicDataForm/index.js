import React, { Component } from 'react';
import styled from 'styled-components';

import ReportIntervalButtonList from './ReportIntervalButtonList';
import Slider from './Slider';
import TagList from './TagList';
import TextInput from './TextInput';

// styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

class BasicDataForm extends Component {
    constructor() {
        super();
        this.state = {
            typingTag: '',
        };
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTagKeyUp = this.handleTagKeyUp.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTagChange(event) {
        this.setState({
            typingTag: event.currentTarget.value,
        });
    }

    handleTagKeyUp(event) {
        if (event.key === 'Enter') {
            let typingTag = event.currentTarget.value;
            if (typingTag) {
                this.props.handleTagAdd(typingTag);
                this.setState({
                    typingTag: '',
                });
            }
        }
    }

    handleTitleChange(event) {
        this.props.handleTitleChange(event.currentTarget.value);
    }

    render() {
        const {
            duration,
            handleCheckPointChange,
            handleDurationChange,
            handleTagDelete,
            interval,
            step,
            tags,
            title,
        } = this.props;

        const {
            typingTag,
        } = this.state;

        return (
            <Wrapper>
                <TextInput
                    handleTextChange={this.handleTitleChange}
                    label="標題："
                    value={title}
                />
                <TextInput
                    handleKeyUp={this.handleTagKeyUp}
                    handleTextChange={this.handleTagChange}
                    label="標籤："
                    value={typingTag}
                />
                <TagList
                    handleTagDelete={handleTagDelete}
                    tagList={tags}
                />
                <Slider
                    duration={duration}
                    handleDurationChange={handleDurationChange}
                />
                <ReportIntervalButtonList
                    handleCheckPointChange={handleCheckPointChange}
                    interval={interval}
                />
            </Wrapper>
        );
    }
}

export default BasicDataForm;
