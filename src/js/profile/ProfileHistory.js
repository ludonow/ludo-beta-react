import React, { Component, PropTypes } from 'react';

import ProfileCategoryTabs from './ProfileCategoryTabs';
import ProfileLudoList from './ProfileLudoList';

export default class ProfileHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWatchingCategory: 0,
            filteredProfileNewLudoData: [],
            isComponentUpdated: true,
            prevSelectedCategoryArrayLength: 0
        };
        this.handleCurrentWatchingCategory = this.handleCurrentWatchingCategory.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { prevSelectedCategoryArrayLength } = this.state;
        if (!prevState.isComponentUpdated && prevSelectedCategoryArrayLength != prevState.filteredProfileNewLudoData.length) {
            this.props.forceMasonryUpdate();
        }
    }   

    componentWillUpdate(nextProps, nextState) {
        const { filteredProfileNewLudoData } = this.state;
        const prevSelectedCategoryArrayLength = filteredProfileNewLudoData.length;
        if (!nextState.isComponentUpdated) {
            this.setState({
                prevSelectedCategoryArrayLength,
                isComponentUpdated: true
            });
        }
    }

    handleCurrentWatchingCategory(event) {
        const currentWatchingCategory = Number(event.currentTarget.id) + 1;
        const filteredProfileNewLudoData = this.props.profileDidLudoData.filter((SingleLudoObject) => {
            if (SingleLudoObject.category_id === currentWatchingCategory) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({
            currentWatchingCategory,
            filteredProfileNewLudoData,
            isComponentUpdated: false
        });
    }

    render() {
        return (
            /* components/_profile-card.scss */
            <div className="profile-card">
                <div className="profile-card__title">{'之前參與過'}</div>
                <ProfileCategoryTabs
                    onCurrentWatchingCategory={this.handleCurrentWatchingCategory} 
                    profileLudoData={this.props.profileDidLudoData}
                />
                <ProfileLudoList profileLudoData={this.state.filteredProfileNewLudoData} />
            </div>
        );
    }
}

ProfileHistory.defaultProps = {
    profileDidLudoData: [{
        category_id: 0
    }]
};

ProfileHistory.propTypes = {
    forceMasonryUpdate: PropTypes.func.isRequired,
    profileDidLudoData: PropTypes.arrayOf(PropTypes.shape({
        category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
    })).isRequired
};