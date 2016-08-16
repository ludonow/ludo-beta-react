import React from "react";

import HeaderClock from './HeaderClock';
import HeaderHeart from './HeaderHeart';
import HeaderLogo from './HeaderLogo';
import HeaderMarbles from './HeaderMarbles';
import HeaderRate from './HeaderRate';

export default class Header extends React.Component {
    render() {
        return ( 
            <div className="header">
                <div className="header-left">
                    <HeaderLogo />
                </div>
                <div className="header-right">
                    <HeaderMarbles />
                    <HeaderHeart />
                    <HeaderRate />
                    <HeaderClock />
                </div>
            </div>
        );
    }
};
