import CloudyDayIcon from '../../images/bonus_period_icon/cloudy-day.png';
import HalfMoonIcon from '../../images/bonus_period_icon/half-moon.png';
import SunIcon from '../../images/bonus_period_icon/sun.png';
import SunSetIcon from '../../images/bonus_period_icon/sunset.png';
import SunRiseIcon from '../../images/bonus_period_icon/sunrise.png';

export const bonusPeriodIconList = [
    SunRiseIcon,
    SunIcon,
    SunSetIcon,
    HalfMoonIcon,
    CloudyDayIcon,
];

export const periodList = [
    {
        label: '晨醒模板',
        period: '5-11',
    },
    {
        label: '午間模板',
        period: '11-15',
    },
    {
        label: '日落模板',
        period: '15-19',
    },
    {
        label: '夜晚模板',
        period: '19-5',
    },
    {
        label: '全天候模板',
        period: '0-24',
    },
];

function getBonusPeriodIndexFromPeriod(period) {
    const bonusPeriodIndex = periodList.findIndex(
        element => (element.period === period)
    );
    return bonusPeriodIndex;
}

function getPeriodDisplayByPeriod(bonusPeriodIndex) {
    let display = '';
    switch (bonusPeriodIndex) {
        case 0:
            display = '05:00~10:59';
            break;
        case 1:
            display = '11:00~14:59';
            break;
        case 2:
            display = '15:00~18:59';
            break;
        case 3:
            display = '19:00~04:59';
            break;
        case 4:
        default:
            display = '00:00~23:59';
            break;
    }

    return display;
}

export { getBonusPeriodIndexFromPeriod, getPeriodDisplayByPeriod };
