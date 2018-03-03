import React, { Component } from 'react';

import ReportDate from './ReportDate';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

export default class MobileReportEditButton extends Component {
    constructor(props) {
        super(props);
        this.handleImageEditingTouchTap = this.handleImageEditingTouchTap.bind(this);
        this.handleTextEditingTouchTap = this.handleTextEditingTouchTap.bind(this);
    }

    handleImageEditingTouchTap(event) {
        event.preventDefault();
        this.props.handleIsEditingImage(true);
    }

    handleTextEditingTouchTap(event) {
        event.preventDefault();
        this.props.handleIsEditingText(true);
    }

    /* components/_single-report.scss */
    render() {
        const {
            anchorEl,
            handleReportDelete,
            handleReportEditButtonTouchTap,
            isDeleting,
            isPopOverOfEditOpen,
            onRequestClose,
            reportObject,
        } = this.props;
        return (
            <div>
                <div className="mobile-report-icon-button">
                    <IconButton
                        onTouchTap={handleReportEditButtonTouchTap}
                        tooltip="編輯"
                    >
                        <ModeEdit />
                    </IconButton>
                </div>
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    onRequestClose={onRequestClose}
                    open={isPopOverOfEditOpen}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <Menu>
                        <MenuItem
                            disabled={isDeleting}
                            onClick={handleReportDelete}
                            primaryText="刪除此回報"
                        />
                    </Menu>
                </Popover>
            </div>
        );
    }
}
