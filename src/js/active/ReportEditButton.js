import React, { Component } from 'react';

import ReportDate from './ReportDate';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

export default class ReportEditButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { index, isEditingWhichReportIndex, reportList, whichList } = this.props;
        return (
            <div>
                {/* components/_single-report.scss */}
                <div className="report-icon-button">
                    <ReportDate
                        index={index}
                        reportList={reportList}
                    />
                    <IconButton
                        id={`${whichList}-report-edit-${index}`}
                        onTouchTap={this.props.handleReportEditButtonTouchTap}
                        tooltip="編輯"
                        className="desktop_edit_button"
                    >
                        <ModeEdit />
                    </IconButton>
                </div>
                {
                    reportList[isEditingWhichReportIndex] ?
                        <Popover
                            anchorEl={this.props.anchorEl}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            onRequestClose={this.props.onRequestClose}
                            open={this.props.isPopOverOfEditOpen}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <Menu>
                                {/* <MenuItem
                                    disabled={!reportList[isEditingWhichReportIndex].content}
                                    id={`${whichList}-text-edit-${isEditingWhichReportIndex}`}
                                    onTouchTap={this.props.handleEditTextReportClick}
                                    primaryText="編輯文字回報"
                                />
                                <MenuItem
                                    disabled={!reportList[isEditingWhichReportIndex].image_location}
                                    id={`${whichList}-image-edit-${isEditingWhichReportIndex}`}
                                    onTouchTap={this.props.handleEditImageReportClick}
                                    primaryText="編輯圖片回報"
                                /> */}
                                <MenuItem
                                    id={`${whichList}-report-delete-${isEditingWhichReportIndex}`}
                                    onTouchTap={this.props.handleReportDelete}
                                    primaryText="刪除此回報"
                                />
                            </Menu>
                        </Popover>
                    : null
                }
            </div>
        );
    }
}
