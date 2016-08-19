import React from "react";
import { Link } from "react-router";
import Playground from '../../playground/Playground';

import imageLogo from '../../../images/Ludo_logo.png';

export default class HeaderLogo extends React.Component {
    render() {
        return (
            <Link to="Playground">
                <div className="header-Ludo-logo">
                    <img src={imageLogo} className="header-Ludo-logo__icon"/>
                </div>
            </Link>
        );
    }
}