import React, { Component, PropTypes } from 'react';

import ProfileCategoryTabs from './ProfileCategoryTabs';
import ProfileLudoList from './ProfileLudoList';

export default class ProfileLudoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWatchingCategory: 0,
            filteredProfileLudoingData: [],
            isComponentUpdated: true,
            prevSelectedCategoryArrayLength: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { prevSelectedCategoryArrayLength } = this.state;
        if (!prevState.isComponentUpdated && prevSelectedCategoryArrayLength != prevState.filteredProfileLudoingData.length) {
            this.props.forceMasonryUpdate();
        }
    }   

    componentWillUpdate(nextProps, nextState) {
        const { filteredProfileLudoingData } = this.state;
        const prevSelectedCategoryArrayLength = filteredProfileLudoingData.length;
        if (!nextState.isComponentUpdated) {
            this.setState({
                prevSelectedCategoryArrayLength,
                isComponentUpdated: true
            });
        }
    }

    handleCurrentWatchingCategory = (event) => {
        const currentWatchingCategory = Number(event.currentTarget.id) + 1;
        const filteredProfileLudoingData = this.props.profileLudoData.filter((SingleLudoObject) => {
            if (SingleLudoObject.category_id == currentWatchingCategory) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({
            currentWatchingCategory,
            filteredProfileLudoingData,
            isComponentUpdated: false
        });
    }

    render() {
        return (
            <div className="profile-card">
                <div className="profile-card__title">{'正在進行中'}</div>
                <ProfileCategoryTabs onCurrentWatchingCategory={this.handleCurrentWatchingCategory} 
                    profileLudoData={this.props.profileLudoData}
                />
                <ProfileLudoList profileLudoData={this.state.filteredProfileLudoingData}/>
            </div>
        );
    }
}

ProfileLudoCard.defaultProps = {
    profileLudoData: [{
        category_id: 0
    }]
};

ProfileLudoCard.propTypes = {
    forceMasonryUpdate: PropTypes.func.isRequired,
    profileLudoData: PropTypes.arrayOf(PropTypes.shape({
        category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
    })).isRequired
};