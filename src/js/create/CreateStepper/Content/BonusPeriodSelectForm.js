import React, { Component } from 'react';
import styled from 'styled-components';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import CloudyDayIcon from '../../../../images/bonus_period_icon/cloudy-day.png';
import HalfMoonIcon from '../../../../images/bonus_period_icon/half-moon.png';
import SunIcon from '../../../../images/bonus_period_icon/sun.png';
import SunSetIcon from '../../../../images/bonus_period_icon/sunset.png';
import SunRiseIcon from '../../../../images/bonus_period_icon/sunrise.png';

const bonusPeriodIconList = [
    SunRiseIcon,
    SunIcon,
    SunSetIcon,
    HalfMoonIcon,
    CloudyDayIcon,
];

const periodList = [
    {
        label: '晨醒模板',
        period: '0500-1100',
    },
    {
        label: '午間模板',
        period: '1100-1500',
    },
    {
        label: '日落模板',
        period: '1500-1900',
    },
    {
        label: '夜晚模板',
        period: '1900-0500',
    },
    {
        label: '全天候模板',
        period: '0000-2400',
    },
];

// styled components
const IconWrapper = styled.div`

`;

const Wrapper = styled.div`
    display: inline-flex;
`;

class BonusPeriodSelectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bonusPeriodIndex: 4,
        };
        this.getBonusPeriodIndexFromPeriod = this.getBonusPeriodIndexFromPeriod.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.period !== this.props.period &&
            nextProps.period !== this.state.period 
        ) {
            this.getBonusPeriodIndexFromPeriod(nextProps.period);
        }
    }

    getBonusPeriodIndexFromPeriod(period) {
        const bonusPeriodIndex = periodList.findIndex(
            element => (element.period === period)
        );
        this.setState({
            bonusPeriodIndex,
        });
    }

    render() {
        const {
            handlePeriodChange,
            period,
        } = this.props;
        const { bonusPeriodIndex } = this.state;
        return (
            <Wrapper>
                <IconWrapper>
                    <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                </IconWrapper>
                <SelectField
                    fullWidth
                    onChange={handlePeriodChange}
                    value={period}
                >
                    {
                        periodList.map((periodInfo, periodIndex) => {
                            return (
                                <MenuItem
                                    key={`create-card-period-${periodIndex}`}
                                    primaryText={periodInfo.label}
                                    value={periodInfo.period}
                                />
                            );
                        })
                    }
                </SelectField>
            </Wrapper>
        );
    }
}

export default BonusPeriodSelectForm;
