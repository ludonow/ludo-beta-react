import React from 'react';
import { Link } from "react-router";

import Create from '../create/Create';

export default class QuickStart extends React.Component {
    render() {
        return (
            <div className="grid-item">
                <Link to="Create" className="remove-hyperlink-style">
                     <div className="quick-start">
                        <div className="quick-start__icon"></div>
                     </div>
                  </Link>
            </div>
        );
    }
}