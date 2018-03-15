import React from 'react';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

import DesktopReportDate from './DesktopReportDate';

const StyledIconButton = styled(IconButton)`
    z-index: auto !important;
`;

/* components/_single-report.scss */
const EditButton = ({
    anchorEl,
    createDate,
    handleEditImageReportClick,
    handleEditTextReportClick,
    handleReportDelete,
    handleReportEditButtonTouchTap,
    index,
    isEditingWhichReportIndex,
    isPopOverOfEditOpen,
    onRequestClose,
    whichList,
}) => (
    <div>
        <div className="report-icon-button">
            <DesktopReportDate createDate={createDate} />
            <StyledIconButton
                className="desktop_edit_button"
                id={`${whichList}-report-edit-${index}`}
                onTouchTap={handleReportEditButtonTouchTap}
                tooltip="編輯"
            >
                <ModeEdit />
            </StyledIconButton>
        </div>
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={onRequestClose}
            open={isPopOverOfEditOpen}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <Menu>
                {/* <MenuItem
                    disabled={!reportList[isEditingWhichReportIndex].content}
                    id={`${whichList}-text-edit-${isEditingWhichReportIndex}`}
                    onTouchTap={handleEditTextReportClick}
                    primaryText="編輯文字回報"
                /> */}
                <MenuItem
                    id={`${whichList}-report-delete-${isEditingWhichReportIndex}`}
                    onTouchTap={handleReportDelete}
                    primaryText="刪除此回報"
                />
            </Menu>
        </Popover>
    </div>
);

export default EditButton;
