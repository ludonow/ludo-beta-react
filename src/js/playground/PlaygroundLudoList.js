import React from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';

import QuickStart from './QuickStart';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

import marbleIcon from '../../images/marble.png';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    fitWidth: true
}

export default class PlaygroundLudoList extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawCardContent: [],
            masonryCardContent: []
        };
    }

    componentDidMount() {
        this.getCardContent();
    }

    getCardContent() {
        const _this = this;

        this.serverRequest = axios.get('data/LudoData.json')
            .then(function (response) {
                _this.setState({
                    rawCardContent: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    handleCardStage(stage) {
        if (stage == 1) {
            return `card-bottom__stage--opened`;
        } else {
            return `card-bottom__stage--closed`;
        }
        
    }

    handleCardTopClass(category_id) {
        switch (category_id) {
            case 1:
                return `card-top lifestyle`;
            case 2:
                return `card-top read`;
            case 3:
                return `card-top exercise`;
            case 4:
                return `card-top study`;
            case 5:
                return `card-top new_skill`;
            case 6:
                return `card-top unmentionables`;
            case 7:
                return `card-top others`;
            default:
                return `card-top lifestyle`;
        }
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

    addMasonryClass() {
        this.state.masonryCardContent = this.state.rawCardContent.map( (data, index) => {
            return (
                <div className="grid-item" key={index}>
                    <div className="card">
                        <div className={this.handleCardTopClass(data.category_id)}>
                            <div>{data.title}</div>
                            <br />
                            <div>{data.duration} days</div>
                            <br />
                            <br />
                            <div className="card-marble">
                                <img src={marbleIcon} className="card-marble__icon" />
                                <span className="card-marble__number">{data.marbles}</span>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <img className="card-bottom__category-icon" src={this.handleCategoryIcon(data.category_id)} />
                            <div className={`card-bottom__stage ${this.handleCardStage(data.stage)}`} />
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        this.addMasonryClass();
        return (
            <Masonry
                className="playground"
                options={masonryOptions} >
                <QuickStart />
                {this.state.masonryCardContent}
            </Masonry>
        );
    }
}