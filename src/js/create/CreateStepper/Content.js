import React, { Component } from 'react';
import styled from 'styled-components';

import FrequencyButtonList from './FrequencyButtonList';
import Slider from './Slider';
import TagList from './TagList';
import TextInput from './TextInput';

// styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

class Content extends Component {
    constructor() {
        super();
        this.state = {
            tagList: [],
            title: '',
            typingTag: '',
        };
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTagKeyUp = this.handleTagKeyUp.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTagChange(event) {
        this.setState({
            typingTag: event.currentTarget.value,
        });
    }

    handleTagDelete(event) {
        const deletedIndex = Number(event.currentTarget.dataset.id);
        this.setState(
            (prevState) => ({
                tagList: [
                    ...prevState.tagList.slice(0, deletedIndex),
                    ...prevState.tagList.slice(deletedIndex + 1),
                ],
            })
        );
    }

    handleTagKeyUp(event) {
        if (event.key === 'Enter') {
            let typingTag = event.currentTarget.value;
            if (typingTag) {
                if (typingTag.indexOf('#') === 0) {
                    typingTag = typingTag.slice(1);
                }
                this.setState(
                    (prevState) => ({
                        tagList: [
                            ...prevState.tagList,
                            typingTag,
                        ],
                        typingTag: '',
                    })
                );
            }
        }
    }

    handleTitleChange(event) {
        this.setState({
            title: event.currentTarget.value,
        });
    }

    render() {
        const {
            step,
        } = this.props;

        const {
            tagList,
            title,
            typingTag,
        } = this.state;

        return (
            <Wrapper>
                <TextInput
                    handleTextChange={this.handleTitleChange}
                    label="標題："
                    text={title}
                />
                <TextInput
                    handleKeyUp={this.handleTagKeyUp}
                    handleTextChange={this.handleTagChange}
                    label="標籤："
                    text={typingTag}
                />
                <TagList
                    handleTagDelete={this.handleTagDelete}
                    tagList={tagList}
                />
                <Slider />
                <FrequencyButtonList
                />
            </Wrapper>
        );
    }
}

export default Content;
