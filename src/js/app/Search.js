import React from "react";

export default class Search extends React.Component {
    render() {
        return (
            <div className="grid-item">
                <div className="search">
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
            </div>
        );
    }
};
