import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    handleReportDelete,
    handleReportEditButtonTouchTap,
    handleReportEditing,
    handleRequestClose,
    index,
    isEditingWhichReportIndex,
    isPopOverOfEditOpen,
    label,
}) => (
    <div>
        <div className="report-icon-button">
            <DesktopReportDate createDate={createDate} />
            <StyledIconButton
                className="desktop_edit_button"
                id={`${label}-report-edit-${index}`}
                onTouchTap={handleReportEditButtonTouchTap}
                tooltip="編輯"
            >
                <ModeEdit />
            </StyledIconButton>
        </div>
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={handleRequestClose}
            open={isPopOverOfEditOpen}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <Menu>
                <MenuItem
                    id={`${label}-report-edit-${isEditingWhichReportIndex}`}
                    onTouchTap={handleReportEditing}
                    primaryText="編輯此回報"
                />
                <MenuItem
                    id={`${label}-report-delete-${isEditingWhichReportIndex}`}
                    onTouchTap={handleReportDelete}
                    primaryText="刪除此回報"
                />
            </Menu>
        </Popover>
    </div>
);

EditButton.propTypes = {
    anchorEl: PropTypes.object,
    createDate: PropTypes.string.isRequired,
    handleReportDelete: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isEditingWhichReportIndex: PropTypes.number.isRequired,
    isPopOverOfEditOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};

export default EditButton;
