import React from "react";

import imageLogo from '../../../images/Ludo_logo.png';

export default class HeaderLogo extends React.Component {
    render() {
        return (
            <a href="">
                <div className="header-Ludo-logo">
                    <img src={imageLogo} className="header-Ludo-logo__icon"/>
                </div>
            </a>
        );
    }
}