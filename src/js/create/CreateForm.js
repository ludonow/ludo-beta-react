import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

import quick_start from '../../images/create/create-content/quick_start_icon.png';

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
        const type = ['lifestyle', 'read', 'exercise', 'school'];
        return (
            <div className="create-content-information">
                <div className="create-content-information-icon">
                    <div className="create-content-information-icon__icon">
                        <img src={quick_start} />
                    </div>
                </div>
                <div className="create-content-information-tag">
                    <DropdownList 
                        className="create-form-drop_down_list"
                        defaultValue={"lifestyle"}
                        data={type}
                    />
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
            </div>
        );
    }
}