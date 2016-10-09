import React, { Component, PropTypes } from 'react';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';
const iconArray = [lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class ProfileCategoryTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LudoCategoryArray: [0, 0, 0, 0, 0, 0, 0],
            hasGotData: false
        };
    }

    componentWillReceiveProps(nextProps) {   
        if (nextProps.profileLudoData.length != 0 && !this.state.hasGotData) {
            const { profileLudoData } = nextProps;
            // let LudoCategoryArray = [0, 0, 0, 0, 0, 0, 0];
            let LudoCategoryArray = new Array(7).fill(0);
            profileLudoData.map((singleLudo) => {
                LudoCategoryArray[Number(singleLudo.category_id) - 1]++;
            });
            // console.log('LudoCategoryArray', LudoCategoryArray);   // debug
            this.setState({
                hasGotData: true,
                LudoCategoryArray
            });
        }
    }

    render() {
        const { LudoCategoryArray } = this.state;
        return (
            <div className="profile-card__category-tabs">
                {
                    iconArray.map((iconImage, iconIndex) => {
                        return (
                            <div className={LudoCategoryArray[iconIndex] ? 'profile-card__category-tabs__image-container' : 'profile-card__category-tabs__image-container--empty'}
                                id={iconIndex}
                                key={`icon-${iconIndex}`}
                                onClick={this.props.onCurrentWatchingCategory}
                            >
                                <img className="profile-card__category-tabs__image" 
                                    src={iconImage}
                                />
                                <div className="number"
                                >
                                    {LudoCategoryArray[iconIndex]}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ProfileCategoryTabs.propTypes = {
    onCurrentWatchingCategory: PropTypes.func.isRequired
};