import React from 'react';
import MediaQuery from 'react-responsive';

/* layout/main-container */
const Main = (props) => (
    <div>
        <MediaQuery minWidth={768}>
            <div
                className="main-container"
                onScroll={props.handleScrollEvent}
            >
                { props.children }
            </div>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
            <div
                className="mobile-main-container"
                onScroll={props.handleScrollEvent}
            >
                { props.children }
            </div>
        </MediaQuery>
    </div>
);

export default Main;
