import React from 'react';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import DesktopReportDate from './DesktopReportDate';

const style = {
    'fontSize': '14px'
};

/* components/_single-report.scss */
const ExpandMoreButton = ({
    anchorEl,
    createDate,
    handleReportDenounce,
    handleReportExpandMoreButtonTouchTap,
    index,
    isPopOverOfExpandMoreOpen,
    onRequestClose,
    whichList,
}) => (
    <div>
        <div className="report-icon-button">
            <DesktopReportDate createDate={createDate} />
            <IconButton
                className="desktop_edit_button"
                id={`${whichList}-report-expand-more-${index}`}
                onTouchTap={handleReportExpandMoreButtonTouchTap}
                tooltip="更多"
            >
                <ExpandMore />
            </IconButton>
        </div>
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={onRequestClose}
            open={isPopOverOfExpandMoreOpen}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <Menu>
                <MenuItem
                    id={`${whichList}-report-denounce-${index}`}
                    innerDivStyle={style}
                    onTouchTap={handleReportDenounce}
                    primaryText="檢舉此回報"
                />
            </Menu>
        </Popover>
    </div>
);

export default ExpandMoreButton;
