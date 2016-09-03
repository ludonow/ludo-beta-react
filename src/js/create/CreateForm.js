import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import NumberPicker from 'react-widgets/lib/NumberPicker';

import quick_start from '../../images/create/create-content/quick_start_icon.png';

export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoCreateForm: {
                category_id: 0,
                marbles: 1,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: ''
            },
            currentHoverValue: 0,
            isDurationClick: false
        };
        numberLocalizer();
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleMarblesChange = this.handleMarblesChange.bind(this);
        this.handleDayPickerClick = this.handleDayPickerClick.bind(this);
        this.handleDayPickerMouseOver = this.handleDayPickerMouseOver.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleDayPickerReset = this.handleDayPickerReset.bind(this);
        this.handleDayPickerDuration = this.handleDayPickerDuration.bind(this);
        this.handleDayPickerCheckpoint =this.handleDayPickerCheckpoint.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCategoryChange(category) {
        let category_id = 0;
        switch (category) {
            case 'lifestyle':
                category_id = 1;
                break;
            case 'read':
                category_id = 2;
                break;
            case 'exercise':
                category_id = 3;
                break;
            case 'school':
                category_id = 4;
                break;
            default:
                category_id = 0;
                break;
        }
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                category_id
            })
        );
    }

    handleMarblesChange(marbles) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                marbles
            })
        );
    }

    handleDayPickerReset(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                duration: 3,
                checkpoint: [3]
            })
        );
        this.setState(
            Object.assign(this.state, {
                currentHoverValue: 3,
                isDurationClick: false
            })
        );
    }

    handleDayPickerDuration(event) {

    }

    handleDayPickerCheckpoint(event) {

    }

    handleDayPickerClick(event) {
        this.setState(
            Object.assign(this.state, {
                isDurationClick: true
            })
        );
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                duration: Number(event.target.value)
            })
        );
    }

    handleDayPickerMouseOver(event) {
        if (!this.state.isDurationClick) {
            const { ludoCreateForm } = this.state;
            if (Number(event.target.value) >= 4) {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: Number(event.target.value)
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentHoverValue: Number(event.target.value)
                    })
                );
            } else {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: 3
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentHoverValue: 3
                    })
                );
            }
        }
    }

    handleDayPickerClass(value) {
        if(value <= this.state.currentHoverValue) {
            return 'create-form-day-picker__button' + '--selected';
        } else {
            return 'create-form-day-picker__button';
        }
    }

    handleTitleChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                title: event.target.value
            })
        );
    }

    handleIntroductionChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                introduction: event.target.value
            })
        );
    }

    handleTagsChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                tags: event.target.value
            })
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const { ludoCreateForm } = this.state;
        setTimeout(() => {  // simulate server latency
            window.alert(`You submitted:\n\n${JSON.stringify(ludoCreateForm, null, 2)}`);
        }, 200)
    }

    render() {
        const category = ['lifestyle', 'read', 'exercise', 'school'];
        return (
            <form onSubmit={this.handleSubmit} className="create-form-information">
                <div className="create-form-information-icon">
                    <div className="create-form-information-icon__icon">
                        <img src={quick_start} />
                    </div>
                </div>
                <div className="create-form-fields">
                    <div className="create-form-field">
                        <label>Category:&nbsp;&nbsp;</label>
                        <DropdownList 
                            className="create-form-drop_down_list"
                            data={category}
                            value={this.state.category}
                            onChange={this.handleCategoryChange}
                        />
                    </div>
                    <div className="create-form-field">
                        <label>Marbles:&nbsp;&nbsp;</label>
                        <NumberPicker 
                            className="create-form-number_picker"
                            value={this.state.ludoCreateForm.marbles}
                            onChange={this.handleMarblesChange}
                            min={1}
                        />
                    </div>
                    <div className="create-form-day-picker">
                        <label>Duration and Checkpoint:&nbsp;&nbsp;<br /></label>
                        <input className="create-form-day-picker__button--reset" type="button" value="Reset" 
                            onClick={this.handleDayPickerReset} />
                        <input className="create-form-day-picker__button--duration" type="button" value="Duration" 
                            onClick={this.handleDayPickerDuration} />
                        <input className="create-form-day-picker__button--checkpoint" type="button" value="Checkpoint" 
                            onClick={this.handleDayPickerCheckpoint} />
                        <br />
                        <input className={this.handleDayPickerClass(1)} type="button" value="1" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(2)} type="button" value="2" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(3)} type="button" value="3" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(4)} type="button" value="4" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(5)} type="button" value="5" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(6)} type="button" value="6" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(7)} type="button" value="7" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <br />
                        <input className={this.handleDayPickerClass(8)} type="button" value="8" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(9)} type="button" value="9" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(10)} type="button" value="10" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(11)} type="button" value="11" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(12)} type="button" value="12" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(13)} type="button" value="13" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <input className={this.handleDayPickerClass(14)} type="button" value="14" 
                            onClick={this.handleDayPickerClick} onMouseOver={this.handleDayPickerMouseOver} />
                        <label>Duration:&nbsp;&nbsp; {this.state.ludoCreateForm.duration}&nbsp;days</label>
                        <br />
                        <label>Checkpoint:&nbsp;&nbsp; {this.state.ludoCreateForm.checkpoint}&nbsp;</label>
                    </div>
                    <div className="create-form-field">
                        <label>Title:&nbsp;&nbsp;<br /></label>
                        <input type="text" onChange={this.handleTitleChange}/>
                    </div>
                    <div className="create-form-field">
                        <label>Introduction:&nbsp;&nbsp;<br /></label>
                        <input type="text" onChange={this.handleIntroductionChange}/>
                    </div>
                    <div className="create-form-field">
                        <label>Hash Tags:&nbsp;&nbsp;<br /></label>
                        <input type="text" onChange={this.handleTagsChange}/>
                    </div>
                    <button className="create-form-field" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}