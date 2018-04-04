import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HeaderFBPhoto from './HeaderFBPhoto';
import HeaderLogIn from './HeaderLogIn';
import UpDownToggleButton from '../../components/UpDownToggleButton';

// styled components
const HeaderRightWrapper = styled.div`
    align-items: center;
    display: inline-flex;
    height: 100%;
`;

const HeaderRight = ({
    handlePersonalCardListToggleButtonClick,
    isOpeningLudoListPage,
    isPersonalCardListVisible,
    pathName,
    userBasicData,
}) => (
    <HeaderRightWrapper>
        {
            isOpeningLudoListPage && userBasicData.name ?
                <UpDownToggleButton
                    handleClick={handlePersonalCardListToggleButtonClick}
                    isArrowPointingDown={!isPersonalCardListVisible}
                    label="我的卡片"
                />
            : null
        }
        <div>
            {
                userBasicData.name ?
                    <HeaderFBPhoto userBasicData={userBasicData} />
                :
                    <HeaderLogIn pathName={pathName} />
            }
        </div>
    </HeaderRightWrapper>
);

HeaderRight.propTypes = {
    handlePersonalCardListToggleButtonClick: PropTypes.func.isRequired,
    isOpeningLudoListPage: PropTypes.bool.isRequired,
    isPersonalCardListVisible: PropTypes.bool.isRequired,
    pathName: PropTypes.string.isRequired,
    userBasicData: PropTypes.object.isRequired,
};

export default HeaderRight;
