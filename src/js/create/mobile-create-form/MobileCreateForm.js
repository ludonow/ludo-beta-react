import React, { Component } from 'react';

import axios from '../../axios-config';
import CategoryButtons from './CategoryButtons';

export default class MobileCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: 0,
            marbles: 0,
            duration: 3,
            checkpoint: [3],
            title: '',
            introduction: '',
            step: 1,
            tags: []
        };
    }

    render() {
        switch (this.state.step) {
        case 1:
            return <CategoryButtons />
        }
    }
}
