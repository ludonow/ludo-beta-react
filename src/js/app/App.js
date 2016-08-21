import React from 'react';

import Header from './header/Header';
import Search from './search/Search';
import SideBar from './SideBar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isProfile = this.props.routes[1].path === "profile";
        const isPlayground = this.props.routes[1].path === "playground";

        return (
            <div>
                <Header isProfile={isProfile} />
                <SideBar />
                {isPlayground ? <Search /> : null}
                <div style={styles.container} className="main-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

const screenWidth = window.innerWidth;
const rightSidebarWidth = 100;
const cardWidth = 230;
const cardPaddingX = 15;
const columnWidth = cardWidth + cardPaddingX;
const mainWidth = screenWidth - rightSidebarWidth;
const totalColumn = Math.floor(mainWidth / columnWidth);
const contentPaddingX = Math.round( (mainWidth - totalColumn * columnWidth + cardPaddingX)/2 );
const mainWidthWithoutPaddingX = mainWidth - 2 * contentPaddingX;

const styles = {
    container: {
        width: `${mainWidthWithoutPaddingX}px`,
        paddingRight: `${contentPaddingX}px`,
        paddingLeft: `${contentPaddingX}px`
    }
}