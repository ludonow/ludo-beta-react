import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';

import DesktopReportDate from './DesktopReportDate';

const StyledIconButton = styled(IconButton)`
    z-index: auto !important;
`;

/* components/_single-report.scss */
const ExpandMoreButton = ({
    createDate,
    handleReportExpandMoreButtonTouchTap,
    index,
    label,
}) => (
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
);

ExpandMoreButton.propTypes = {
    createDate: PropTypes.string.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};

export default ExpandMoreButton;
