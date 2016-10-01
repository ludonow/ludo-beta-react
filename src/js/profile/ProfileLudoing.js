import React from 'react';
import { browserHistory } from 'react-router';
import axios from '../axios-config';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';
const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class ProfileLudoing extends React.Component {
    constructor(props) {
        super(props);
    }

    handleIconClick(event) {
        const ludo_id = event.currentTarget.id;
        browserHistory.push(`/ludo/${ludo_id}`);
    }

    render() {
        return (
            <div className="profile-element">
                <div className="profile-element__title">正在進行中</div>
                {
                    this.props.profileLudoingData.map( (data, index) => {
                        return (
                            <div className="profile-ludo__element" 
                                key={`Ludoing-${index}`}
                                id={data.ludo_id}
                                onClick={this.handleIconClick}
                            >
                                <img className="profile-ludo__icon" src={iconArray[data.category_id]} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}