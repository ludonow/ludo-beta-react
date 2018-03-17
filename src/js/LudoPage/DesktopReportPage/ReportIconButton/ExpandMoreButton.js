import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import DesktopReportDate from './DesktopReportDate';

const StyledIconButton = styled(IconButton)`
    z-index: auto !important;
`;

const style = {
    'fontSize': '14px'
};

/* components/_single-report.scss */
const ExpandMoreButton = ({
    anchorEl,
    createDate,
    handleReportDenounce,
    handleReportExpandMoreButtonTouchTap,
    handleRequestClose,
    index,
    isPopOverOfExpandMoreOpen,
    label,
}) => (
    <div>
        <div className="report-icon-button">
            <DesktopReportDate createDate={createDate} />
            <StyledIconButton
                className="desktop_edit_button"
                id={`${label}-report-expand-more-${index}`}
                onTouchTap={handleReportExpandMoreButtonTouchTap}
                tooltip="更多"
            >
                <ExpandMore />
            </StyledIconButton>
        </div>
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={handleRequestClose}
            open={isPopOverOfExpandMoreOpen}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <Menu>
                <MenuItem
                    id={`${label}-report-denounce-${index}`}
                    innerDivStyle={style}
                    onTouchTap={handleReportDenounce}
                    primaryText="檢舉此回報"
                />
            </Menu>
        </Popover>
    </div>
);

ExpandMoreButton.propTypes = {
    anchorEl: PropTypes.object,
    createDate: PropTypes.string.isRequired,
    handleReportDenounce: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isPopOverOfExpandMoreOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

export default ExpandMoreButton;
