import React from 'react';
import { Link } from "react-router";

import LudoList from '../../app/LudoList';
import OpenedFormOfStarter from './OpenedFormOfStarter';

export default class OpenedForStarter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="main-container">
                <OpenedFormOfStarter {...this.props} />
                <LudoList {...this.props} />
            </div>
        );
    }
};