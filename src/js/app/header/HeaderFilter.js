import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import imageLogo from '../../../images/Ludo_logo.png';

const screenWidth = window.innerWidth;
const rightSidebarWidth = 0;
const cardPadding = 7;
const gridItemWidth = 210 + 2*cardPadding;
const mainWidth = screenWidth - rightSidebarWidth;
const contentPaddingX = Math.round( (mainWidth - 5 * gridItemWidth)/2 );
const logoLeft = contentPaddingX;

const style = {
    left: `${logoLeft}px`
};

export default class HeaderFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleTemplateFilterClick = this.handleTemplateFilterClick.bind(this);
    }

    handleFilterClick() {
        this.props.getFilteredLudoList();
    }

    handleTemplateFilterClick() {
        this.props.getFilteredLudoList('stage=0');
    }

    render() {
        return (
            /* components/_header-logo.scss */
            <div
                className="header-filter"
            >
                <RaisedButton
                    label="全部"
                    onTouchTap={this.handleFilterClick}
                />
                &nbsp;
                <RaisedButton
                    label="模板"
                    onTouchTap={this.handleTemplateFilterClick}
                />
            </div>
        );
    }
}
