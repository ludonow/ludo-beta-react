import React, { Component } from 'react';
import styled from 'styled-components';

import TextInput from './TextInput';

const Wrapper = styled.div`
    background-color: yellow;
`;

class Content extends Component {
    render() {
        const {
            step,
        } = this.props;

        return (
            <Wrapper>
                <TextInput
                    label="標題"
                />
            </Wrapper>
        );
    }
}

export default Content;
