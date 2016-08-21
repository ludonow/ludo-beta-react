import React from "react";

import HeaderClock from './HeaderClock';
import HeaderHeart from './HeaderHeart';
import HeaderLogo from './HeaderLogo';
import HeaderMarbles from './HeaderMarbles';
import HeaderRate from './HeaderRate';
import HeaderLevel from './HeaderLevel';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="header">
                <div className="header-left">
                    <HeaderLogo />
                </div>
                <div className="header-right">
                    <HeaderMarbles />
                    <HeaderHeart />
                    {this.props.isProfile ? null : <HeaderRate /> }
                    {this.props.isProfile ? null : <HeaderClock /> }
                    {this.props.isProfile ? <HeaderLevel />: null }
                </div>
            </div>
        );
    }
};

Header.propTypes = { isProfile: React.PropTypes.bool };