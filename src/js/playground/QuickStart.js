import React from 'react';
import { Link } from "react-router";

import { baseUrl } from '../baseurl-config';
import Create from '../create/Create';

import createIcon from '../../images/create.png';

export default class QuickStart extends React.Component {
  render() {
    return (
      /* components/_card.scss */
      <div className="grid-item">
        {/* layout/_create.scss */}
        <Link
          className="remove-hyperlink-style"
          to={`${baseUrl}/create`}
        >
          {/* components/_playground-quick-start.scss */}
          <div className="quick-start card--playground">
            <div className="quick-start__icon">
              <img src={createIcon} />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
