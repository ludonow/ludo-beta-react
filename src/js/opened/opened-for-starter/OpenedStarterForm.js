import React from 'react';
import RcSlider from 'rc-slider';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import axios from '../../axios-config';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

const iconArray = [
    othersIcon,
    lifestyleIcon,
    readIcon,
    exerciseIcon,
    studyIcon,
    newSkillIcon,
    unmentionablesIcon,
    othersIcon
];

const IntroductionParagraph = styled.div`
    align-items: center;
    background-color: #f0f0f0;
    font-size: 1.1vw;
    justify-content: center;
    min-height: 70px;
    padding: 10px;
    text-align: left;
    white-space: pre-line;
`;

const TagsWrapper = styled.div`
    border: none;
    margin: 0;
    width: 100%;
`;

const Title = styled.div`
    align-items: center;
    background-color: #f0f0f0;
    font-size: 1vw;
    height: 30px;
    line-height: 30px;
    width: 80%;
`;

export default class OpenedStarterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // category: ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            isDeleteButtonClickable: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isDeleteButtonClickable) {
            this.setState({
                isDeleteButtonClickable: true
            })
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentFormValue();
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.props.router_currentFormValue;
        const index = checkpoint.indexOf(value);
        if (index != -1) {
            return ' ludo-detail-information-day-picker__button--checkpoint';
        } else {
            return ' ludo-detail-information-day-picker__button--duration';
        }
    }

    handleEdit(event) {
        event.preventDefault();
        browserHistory.push(`/ludo-edit/${this.props.params.ludo_id}`);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isDeleteButtonClickable: false
        });
        /* TODO: Use notification confirming delete ludo */
        const isSureToDelete = window.confirm('你確定要刪除這個Ludo嗎？');
        // const isSureToDelete = window.confirm(`Are you sure to delete this ludo?`);
        if (isSureToDelete) {
            axios.delete(`/apis/ludo/${this.props.params.ludo_id}`)
            .then(response => {
                if(response.data.status == '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    browserHistory.push('/playground');
                } else {
                    window.alert('刪除Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('OpenedStarterForm delete else response from server: ', response);
                    console.error('OpenedStarterForm delete else message from server: ', response.data.message);
                    this.setState({
                        isDeleteButtonClickable: true
                    });
                }
            })
            .catch(error => {
                window.alert('刪除Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('OpenedStarterForm delete error', error);
                this.setState({
                    isDeleteButtonClickable: true
                });
            });
        } else {
            this.setState({
                isDeleteButtonClickable: true
            });
        }
    }

    render() {
        const currentFormValue = this.props.router_currentFormValue;
        const { category, maxDuration, maxMarbles } = this.state;
        const { category_id, duration, introduction, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i <= duration) {
                if(i === 7) {
                    dayPickerButtons.push(
                        <input
                            className={`ludo-detail-information-day-picker__button${this.handleDayPickerClass(i)}`}
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />,
                        <br key="br" />
                    );
                } else {
                    dayPickerButtons.push(
                        <input
                            className={`ludo-detail-information-day-picker__button${this.handleDayPickerClass(i)}`}
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />
                    );
                }
            } else {
                if(i == 7) {
                    dayPickerButtons.push(
                        <input
                            className="ludo-detail-information-day-picker__button"
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />,
                        <br key="br" />
                    );
                } else {
                    dayPickerButtons.push(
                        <input
                            className="ludo-detail-information-day-picker__button"
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />
                    );
                }
            }
        }
        return (
            /* components/_form.scss */
            <div className="form">
                {/* components/_ludo-detail-information.scss */}
                <form
                    className="ludo-detail-information-container margin-offset"
                    onSubmit={this.handleSubmit}
                >
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img
                                className="category-icon"
                                src={iconArray[category_id]}
                            />
                        </div>
                        <div className="top-right-container">
                            <div className="text-field-container">
                                <span className="text-field-label">{'種類:'}</span>
                                <span className="text-field-value">
                                    {category[category_id - 1]}
                                </span>
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">{'標題:'}</span>
                                <Title>
                                    {title}
                                </Title>
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="text-label">{'持續期間:'}</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider
                                disabled
                                max={maxDuration}
                                value={duration}
                            />
                        </div>
                        <div className="text-label">{'介紹:'}</div>
                        <div className="text-field-container text-field-container--introduction">
                            <IntroductionParagraph>
                                {introduction}
                            </IntroductionParagraph>
                            {/* components/_tags.scss */}
                            <TagsWrapper className="react-tagsinput">
                                <span className="react-tagsinput-span">
                                    {
                                        tags.length ?
                                            tags.map((tagString, index) => {
                                                return (
                                                    <span className="react-tagsinput-tag" key={`tag-${index}`}>
                                                        {tagString}
                                                    </span>
                                                );
                                            })
                                        : null
                                    }
                                </span>
                            </TagsWrapper>
                        </div>
                        {/* components/_submit-button.scss */}
                        <button
                            className="ludo-detail-information-submit-button"
                            disabled={!this.state.isDeleteButtonClickable}
                            type="submit"
                        >
                            刪除
                        </button>
                        <button
                            className="ludo-detail-information-submit-button"
                            disabled={!this.state.isDeleteButtonClickable}
                            onClick={this.handleEdit}
                        >
                            修改
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};
