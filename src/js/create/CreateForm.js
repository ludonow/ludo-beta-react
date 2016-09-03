import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import NumberPicker from 'react-widgets/lib/NumberPicker';

import quick_start from '../../images/create/create-content/quick_start_icon.png';

export default class CreateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            marbles: 1
        };
        this.handleMarbleChange = this.handleMarbleChange.bind(this);
        numberLocalizer();
    }

    handleMarbleChange(event) {
        this.setState({
            marbles: event
        });
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
                <div className="create-form-fields">
                    <div className="create-form-field">
                        <label>Type:&nbsp;&nbsp;</label>
                        <DropdownList 
                            className="create-form-drop_down_list"
                            defaultValue={"lifestyle"}
                            data={type}
                        />
                    </div>
                    <div className="create-form-field">
                        <label>Marbles:&nbsp;&nbsp;</label>
                        <NumberPicker 
                            className="create-form-number_picker"
                            value={this.state.marbles}
                            onChange={this.handleMarbleChange}
                            min={1}
                        />
                    </div>
                    <div className="create-form-field">
                        <label>Report Format:&nbsp;&nbsp;<br /></label>
                    </div>
                    <div className="create-form-field">
                        <label>Duration and Checkpoint:&nbsp;&nbsp;<br /></label>
                    </div>
                </div>
            </div>
        );
    }
}