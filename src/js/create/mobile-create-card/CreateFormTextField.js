import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Tags from './Tags';

// override material ui
const hintStyle = {
    top: '12px',
};

const styles = {
    errorStyle : {
        color: '#FFC645',
    },
    underlineStyle: {
        borderColor: '#FFC645',
    }
};

export default class CreateFormTextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typingTag: ''
        };
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
        this.handleTagInputKeyUp = this.handleTagInputKeyUp.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleIntroductionChange(event) {
        this.props.handleIntroductionChange(event.currentTarget.value);
    }

    handleTagInputChange(event) {
        const typingTag = event.currentTarget.value;
        this.setState({
            typingTag
        });
    }

    handleTagInputKeyUp(event) {
        if (event.key === 'Enter') {
            const typingTag = event.currentTarget.value;
            if (typingTag) {
                this.props.handleTagAdd(typingTag);
                this.setState({
                    typingTag: ''
                });
            }
        }
    }

    handleTitleChange(event) {
        this.props.handleTitleChange(event.currentTarget.value);
    }

    render() {
        const {
            handleTagDelete,
            introduction,
            title,
            tags
        } = this.props;
        return (
            <div className="mobile-create-form">
                <TextField
                    fullWidth
                    hintText="標題名稱(必填)"
                    onChange={this.handleTitleChange}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                    value={title}
                />
                <TextField
                    fullWidth
                    hintStyle={hintStyle}
                    hintText="簡介(必填)"
                    multiLine
                    onChange={this.handleIntroductionChange}
                    rows={10}
                    rowsMax={10}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                    value={introduction}
                />
                <TextField
                    fullWidth
                    hintText="標籤"
                    onChange={this.handleTagInputChange}
                    onKeyUp={this.handleTagInputKeyUp}
                    value={this.state.typingTag}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                />
                <Tags
                    handleTagDelete={handleTagDelete}
                    tags={tags}
                />
            </div>
        );
    }
}
