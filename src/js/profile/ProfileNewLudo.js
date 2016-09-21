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

export default class ProfileNewLudo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            rawData: []
        };
        this.getNewLudoData = this.getNewLudoData.bind(this);
    }

    componentDidMount() {
        console.log('ProfileNewLudo componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('ProfileNewLudo componentWillReceiveProps');
        if(this.props.isUpdatingProfile) {
            console.log('ProfileNewLudo getNewLudoData');
        //     this.getNewLudoData(nextProps.currentUserId);
        }
    }

    componentWillUnMount() {
        console.log('ProfileNewLudo componentWillUnMount');
    }

    getNewLudoData(user_id) {
        console.log('getNewLudoData before get');
        axios.get(`apis/ludo?stage=1&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    rawData: response.data.ludoList.Items
                });
                console.log('getNewLudoData after successfully get');
            } else {
                console.log('getNewLudoData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('getNewLudoData error', error);
            console.log('getNewLudoData error message from server: ', response.data.message);
        });

        /* example data */
        // this.serverRequest = axios.get('data/LudoingData.json')
        //     .then(response => {
        //         this.setState({
        //             rawData: response.data
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    handleCategoryIcon(category_id) {
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

    handleIconClick(event) {
        const ludo_id = event.currentTarget.id;
        browserHistory.push(`/opened-for-starter/${ludo_id}`);
    }

    render() {
        return (
            <div className="profile-element">
                <div className="profile-element__title">New Ludo</div>
                {
                    this.state.rawData.map( (data, index) => {
                        return (
                            <div className="profile-ludo__element"
                                key={`new-ludo-${index}`}
                                id={data.ludo_id}
                                onClick={this.handleIconClick}
                            >
                                <img className="profile-ludo__icon" src={this.handleCategoryIcon(data.category_id)} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}