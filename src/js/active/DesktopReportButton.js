import React from 'react';

import Button from '../components/Button';

const DesktopReportButton = ({ handleReportDialogOpen }) => (
  <Button
    onClick={handleReportDialogOpen}
    text="我要回報"
  />
);

export default DesktopReportButton;
