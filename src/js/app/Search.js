import React from "react";

export default class Search extends React.Component {
    render() {
        return (
            <footer className="search" style={styles.search}>
                <div className="card">
                    <div className="search-icon">
                        <div className="search-icon__icon"></div>
                    </div>
                    <div className="search-text">
                        <div className="search-text__title">
                            Auto start
                        </div>
                        <input className="search-text__textfield" type="text" name="search" placeholder="條件搜尋"/>
                    </div>
                </div>
            </footer>
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
const searchRight = rightSidebarWidth + contentPaddingX;

const styles = {
    search: {
        right: `${searchRight}px`
    }
}