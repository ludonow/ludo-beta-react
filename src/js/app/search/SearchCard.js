import React from "react";

export default class SearchCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="search" style={style.search}>
                <div className="search-card">
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
const cardPadding = 5;
const gridItemWidth = 210 + 2*cardPadding;
const mainWidth = screenWidth - rightSidebarWidth;
const totalColumn = Math.floor(mainWidth / gridItemWidth);
const contentPaddingX = Math.round( (mainWidth - totalColumn * gridItemWidth)/2 );
const searchRight = rightSidebarWidth + contentPaddingX + cardPadding + 1;

const style = {
    search: {
        right: `${searchRight}px`
    }
};