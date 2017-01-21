import React from 'react';
import { HOC } from 'formsy-react';
import InputPassword from 'react-ux-password-field';

class PasswordField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        console.log('value', value);
        this.props.setValue(value);
    }

    render() {
        // Set a specific className based on the validation state of this component. 
        // showRequired() is true when the value is empty 
        // and the required prop is passed to the input. 
        // showError() is true when the value typed is invalid
        const className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null;
        // An error message is returned ONLY if the component is invalid or the server has returned an error message
        const errorMessage = this.props.getErrorMessage();
        return (
            <div className={className}>
                <InputPassword
                    infoBar={false}
                    minLength={4}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder || ''}
                    unMaskTime={500}
                    value={this.props.getValue() || ''}
                />
                <div className="error-message">{errorMessage}</div>
            </div>
        );
    }
}

export default HOC(PasswordField);