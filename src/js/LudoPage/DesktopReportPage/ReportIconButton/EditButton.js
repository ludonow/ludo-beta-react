import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import DesktopReportDate from './DesktopReportDate';

const StyledIconButton = styled(IconButton)`
    z-index: auto !important;
`;

/* components/_single-report.scss */
const EditButton = ({
    createDate,
    handleReportEditButtonTouchTap,
    index,
    label,
}) => (
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
);

EditButton.propTypes = {
    createDate: PropTypes.string.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};

export default EditButton;
