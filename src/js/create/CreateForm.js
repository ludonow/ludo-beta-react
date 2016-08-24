import React from 'react';

export default class CreateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            value: {
                'key1':'Type',
                'key2':'Date',
                'key3':'Report',
                'key4':'#tag'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value.substr(0, 20)});
    }

    render() {
        return (
            <div className="create-content-information-tag">
                <input
                    className="create-content-information-tag__element"
                    type="text"
                    value={this.state.value.key1}
                    onChange={this.handleChange}
                />
                <input
                    className="create-content-information-tag__element"
                    type="text"
                    value={this.state.value.key2}
                    onChange={this.handleChange}
                />
                <input
                    className="create-content-information-tag__element"
                    type="text"
                    value={this.state.value.key3}
                    onChange={this.handleChange}
                />
                <input
                    className="create-content-information-tag__element"
                    type="text"
                    value={this.state.value.key4}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}