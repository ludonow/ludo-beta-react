import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

import DesktopReportDate from './DesktopReportDate';

/* components/_single-report.scss */
const ReportEditButton = ({
    anchorEl,
    handleEditImageReportClick,
    handleEditTextReportClick,
    handleReportDelete,
    handleReportEditButtonTouchTap,
    index,
    isEditingWhichReportIndex,
    isPopOverOfEditOpen,
    onRequestClose,
    reportList,
    whichList,
}) => (
    <div>
        <div className="report-icon-button">
            <DesktopReportDate
                index={index}
                reportList={reportList}
            />
            <IconButton
                className="desktop_edit_button"
                id={`${whichList}-report-edit-${index}`}
                onTouchTap={handleReportEditButtonTouchTap}
                tooltip="編輯"
            >
                <ModeEdit />
            </IconButton>
        </div>
        {
            reportList[isEditingWhichReportIndex] ?
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
                        />
                        <MenuItem
                            disabled={!reportList[isEditingWhichReportIndex].image_location}
                            id={`${whichList}-image-edit-${isEditingWhichReportIndex}`}
                            onTouchTap={handleEditImageReportClick}
                            primaryText="編輯圖片回報"
                        /> */}
                        <MenuItem
                            id={`${whichList}-report-delete-${isEditingWhichReportIndex}`}
                            onTouchTap={handleReportDelete}
                            primaryText="刪除此回報"
                        />
                    </Menu>
                </Popover>
            : null
        }
    </div>
);

export default ReportEditButton;
