import React from 'react';

/* layout/main-container */
const Main = (props) => (
    <div
        className="main-container"
        onScroll={props.handleScrollEvent}
    >
        { props.children }
    </div>
);

export default Main;
