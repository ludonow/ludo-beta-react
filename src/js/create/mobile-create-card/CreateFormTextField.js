import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Tags from './Tags';

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
            tag: ''
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
        this.setState({
            tag: event.currentTarget.value
        });
    }

    handleTagInputKeyUp(event) {
        if (event.key === 'Enter') {
            this.props.handleTagAdd(event.currentTarget.value);
            this.setState({
                tag: ''
            });
        }
    }

    handleTitleChange(event) {
        this.props.handleTitleChange(event.currentTarget.value);
    }

    render() {
        const {
            handleTagDelete, 
            tags
        } = this.props;
        return (
            <div className="mobile-create-form">
                <TextField
                    // errorStyle={styles.errorStyle}
                    // errorText="必填"
                    hintText="標題名稱"
                    onChange={this.handleTitleChange}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                />
                <TextField
                    // errorStyle={styles.errorStyle}
                    // errorText="必填"
                    hintText="簡介"
                    multiLine
                    onChange={this.handleIntroductionChange}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                />
                <TextField
                    // errorStyle={styles.errorStyle}
                    // errorText="必填"
                    hintText="標籤"
                    onChange={this.handleTagInputChange}
                    onKeyUp={this.handleTagInputKeyUp}
                    value={this.state.tag}
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
