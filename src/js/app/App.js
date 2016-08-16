import React from 'react';

import Header from './header/Header';
import SideBar from './SideBar';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <SideBar />
                <div style={styles.base}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

const screenWidth = window.innerWidth;
const headerHeight = 140;
const rightSidebarWidth = 100;
const cardWidth = 230;
const cardPaddingX = 15;
const cardPaddingTop = 10;
const columnWidth = cardWidth + cardPaddingX;
const mainWidth = screenWidth - rightSidebarWidth;
const totalColumn = Math.floor(mainWidth / columnWidth);
const contentPaddingX = Math.round( (mainWidth - totalColumn * columnWidth + cardPaddingX)/2 );
const contentPaddingY = 14;

const styles = {
    base: {
        position: 'relative',
        top: `${headerHeight}px`,
        paddingTop: `${contentPaddingY}px`,
        marginRight: `${rightSidebarWidth}px`,
        paddingRight: `${contentPaddingX}px`,
        paddingLeft: `${contentPaddingX}px`,
        backgroundColor: 'rgb(232, 235, 237)',
        fontFamily: ["Exo" , "Microsoft JhengHei"]
    }
}