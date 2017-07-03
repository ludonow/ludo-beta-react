import React, { Component, PropTypes } from 'react';

import ProfileCategoryTabs from './ProfileCategoryTabs';
import ProfileLudoList from './ProfileLudoList';

export default class ProfileLudoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWatchingCategory: 0,
            filteredProfileLudoData: [],
            isComponentUpdated: true,
            prevSelectedCategoryArrayLength: 0
        };
        this.handleCurrentWatchingCategory = this.handleCurrentWatchingCategory.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { prevSelectedCategoryArrayLength } = this.state;
        if (!prevState.isComponentUpdated && prevSelectedCategoryArrayLength != prevState.filteredProfileLudoData.length) {
            this.props.forceMasonryUpdate();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileLudoData && this.state.filteredProfileLudoData.length !== nextProps.profileLudoData.length) {
            this.setState({
                filteredProfileLudoData: nextProps.profileLudoData
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { filteredProfileLudoData } = this.state;
        const prevSelectedCategoryArrayLength = filteredProfileLudoData.length;
        if (!nextState.isComponentUpdated) {
            this.setState({
                prevSelectedCategoryArrayLength,
                isComponentUpdated: true
            });
        }
    }

    handleCurrentWatchingCategory(event) {
        const currentWatchingCategory = Number(event.currentTarget.id) + 1;
        const filteredProfileLudoData = this.props.profileLudoData.filter((SingleLudoObject) => {
            if (SingleLudoObject.category_id == currentWatchingCategory) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({
            currentWatchingCategory,
            filteredProfileLudoData,
            isComponentUpdated: false
        });
    }

    render() {
        return (
            /* components/_profile-card.scss */
            <div className="profile-card">
                <div className="profile-card__title">{this.props.title}</div>
                <ProfileCategoryTabs
                    onCurrentWatchingCategory={this.handleCurrentWatchingCategory}
                    profileLudoData={this.props.profileLudoData}
                />
                <ProfileLudoList profileLudoData={this.state.filteredProfileLudoData} />
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
