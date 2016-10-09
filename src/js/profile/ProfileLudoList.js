import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';
const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class ProfileLudoList extends Component {
    constructor(props) {
        super(props);
    }

    handleSingleLudoClick = event => {
        const ludo_id = event.currentTarget.id;
        browserHistory.push(`/ludo/${ludo_id}`);
    }

    render() {
        return (
            <div className="profile-card__ludolist">
                {
                    this.props.profileLudoData.map((ludoObject, index) => {
                        return (
                            <div className="single-ludo"
                                id={ludoObject.ludo_id}
                                key={`Ludoing-${index}`}
                                onClick={this.handleSingleLudoClick}
                            >
                                <div className="single-ludo__category-icon-container">
                                    <img className="single-ludo__category-icon"
                                        src={iconArray[ludoObject.category_id]}
                                    />
                                </div>
                                <div className="single-ludo__title">
                                    {
                                        ludoObject.title
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ProfileLudoList.defaultProps = {
    profileLudoData: [
        {
            category_id: '0',
            ludo_id: '0',
            title: 'title'
        }
    ]
};

ProfileLudoList.propTypes = {
    profileLudoData: PropTypes.arrayOf(PropTypes.shape({
        category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ludo_id: PropTypes.string,
        title: PropTypes.string
    })).isRequired
};