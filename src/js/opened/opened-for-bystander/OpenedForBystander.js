import React from 'react';
import { Link } from "react-router";

import LudoList from '../../app/LudoList';
import OpenedFormOfBystander from './OpenedFormOfBystander';

export default class OpenedForBystander extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="main-container">
                <OpenedFormOfBystander {...this.props} />
                <LudoList {...this.props} />
            </div>
        );
    }
};