import React from 'react';

import Header from './header/Header';
import SideBar from './SideBar';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <SideBar />
                <div style={styles.base} className="main-container">
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
    base: {
        width: `${mainWidthWithoutPaddingX}px`,
        paddingRight: `${contentPaddingX}px`,
        paddingLeft: `${contentPaddingX}px`,
    }
}