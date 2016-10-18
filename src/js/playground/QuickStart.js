import React from 'react';
import { Link } from "react-router";

import Create from '../create/Create';

export default class QuickStart extends React.Component {
  render() {
    return (
      <div className="grid-item">
        <Link
          className="remove-hyperlink-style"
          to="create"
        >
          <div className="quick-start card--playground">
            <div className="quick-start__icon"></div>
          </div>
        </Link>
      </div>
    );
  }
}