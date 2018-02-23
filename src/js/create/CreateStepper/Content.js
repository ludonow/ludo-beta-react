import React, { Component } from 'react';
import styled from 'styled-components';

import TextInput from './TextInput';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class Content extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(value) {
        this.setState({
            title: value,
        });
    }

    render() {
        const {
            step,
        } = this.props;

        const {
            title,
        } = this.state;

        return (
            <Wrapper>
                <TextInput
                    handleTextChange={this.handleTitleChange}
                    label="標題："
                    text={title}
                />
            </Wrapper>
        );
    }
}

export default Content;
