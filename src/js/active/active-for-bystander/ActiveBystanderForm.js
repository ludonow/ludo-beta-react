import React from 'react';
import axios from '../../axios-config';
import RcSlider from 'rc-slider';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

export default class ActiveBystanderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxDuration: 14,
            maxMarbles: 50,
            timeLineMarks: {}
        };
        this.getTimeLineMarks = this.getTimeLineMarks.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { ludoId }= this.props.params;
        const { getCurrentLudoData } = this.props;
        getCurrentLudoData(ludoId);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.currentFormValue.ludo_id != nextProps.currentFormValue.ludo_id) {
            this.getTimeLineMarks(nextProps);
        }
    }

    getCategory(category_id) {
        switch (category_id) {
            case 1:
                return `lifestyle`;
            case 2:
                return `read`;
            case 3:
                return `exercise`;
            case 4:
                return `study`;
            case 5:
                return `newSkill`;
            case 6:
                return `unmentionables`;
            case 7:
                return `others`;
            default:
                return `lifestyle`;
        };
    }

    getCategoryIcon(category_id) {
        switch (category_id) {
            case 1:
                return lifestyleIcon;
            case 2:
                return readIcon;
            case 3:
                return exerciseIcon;
            case 4:
                return studyIcon;
            case 5:
                return newSkillIcon;
            case 6:
                return unmentionablesIcon;
            case 7:
                return othersIcon;
            default:
                return lifestyleIcon;
        }
    }

    getTimeLineMarks(nextProps) {
        const { state } = this;
        const { currentFormValue } = nextProps;
        const { checkpoint, duration } = currentFormValue;

        const { timeLineMarks } = state;
        const durationTimeMarks = {};
        for (let i = 1; i <= duration; i++) {
            if (checkpoint.indexOf(i) != -1) {
                durationTimeMarks[i] = {
                    style: {
                        color: 'white'
                    },
                    label: i
                };
            } else {
                durationTimeMarks[i] = i;
            }
            
        }
        this.setState({
            timeLineMarks: durationTimeMarks
        });
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.props.currentFormValue;
        const index = checkpoint.indexOf(value);
        if (index != -1) {
            return ` ludo-detail-information-day-picker__button--checkpoint`;
        } else {
            return ` ludo-detail-information-day-picker__button--duration`;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleIsUpdatingProfile(true);
        // const isSureToFollow = window.confirm(`Are you sure to follow?`);
        // const { currentFormValue, params } = this.props;
        // const { ludoId } = params;
        // const body = {
        // };
        // console.log('body', body);

        // console.log('before follow axios put');
        // axios.put(`/apis/ludo/${ludoId}`, body)
        // .then(function (response) {
        //     if(response.data.status == '200') {
        //         // TODO: Confirm following Ludo
        //         console.log('response data', response.data);
        //         console.log('after follow axios put');
        //     } else {
        //         console.log('follow else message from server: ', response.data.message);
        //     }
        // })
        // .catch(function (error) {
        //     console.log('follow error', error);
        //     console.log('follow error message from server: ', response.data.message);
        // });
    }

    render() {
        const { maxMarbles, timeLineMarks } = this.state;
        const { currentFormValue } = this.props;
        const { category_id, checkpoint, duration, marbles, tags, title } = currentFormValue;

        return (
            <div className="form form--bystander">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={this.getCategoryIcon(category_id)} />
                        </div>
                        <div className="top-right-container">
                            <div className="category-container">
                                <span className="category-label">Category:</span>
                                <span className="category-value">
                                    {this.getCategory(category_id)}
                                </span>
                            </div>
                            <div className="ludo-detail-information-field__text">
                                {title}
                            </div>
                            <div className="ludo-detail-information-field__text">
                                {tags}
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="marbles-label">Marbles:<span className="marbles-label--number">{marbles}</span></div>
                        <div className="ludo-detail-information-slider--marbles">
                            <RcSlider max={maxMarbles} value={currentFormValue.marbles} disabled={true} />
                        </div>
                        <div className="duration-label">Duration:</div>
                        <div className="report-time-line-container">
                            <RcSlider className="time-line" disabled={true} vertical={true} dots included={false}
                                max={duration} min={1} value={checkpoint} range={checkpoint.length}
                                marks={timeLineMarks}
                            />
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit">
                            Follow
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};