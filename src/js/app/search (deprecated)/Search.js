import React from "react";
import Masonry from 'react-masonry-component';

import SearchCard from "./SearchCard";

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    originLeft: false,
    // fitWidth: true
}

export default class Search extends React.Component {
    render() {
        return (
            <Masonry
                options={masonryOptions} >
                <SearchCard />
            </Masonry>
        );
    }
};