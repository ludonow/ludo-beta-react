import React from 'react';
import { Link } from "react-router";

import Create from '../create/Create';

export default class QuickStart extends React.Component {
  render() {
    return (
      /* components/_card.scss */
      <div className="grid-item">
        {/* layout/_create.scss */}
        <Link
          className="remove-hyperlink-style"
          to="create"
        >
          {/* components/_playground-quick-start.scss */}
          <div className="quick-start card--playground">
            <div className="quick-start__icon">NEW</div>
          </div>
        </Link>
      </div>
    );
  }
}
