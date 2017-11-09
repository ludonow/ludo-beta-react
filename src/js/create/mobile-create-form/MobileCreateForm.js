import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import StepZilla from 'react-stepzilla';

import axios from '../../axios-config';

const steps = [
  {name: 'Step 1', component: <Step1 />},
  {name: 'Step 2', component: <Step2 />},
  {name: 'Step 3', component: <Step3 />},
  {name: 'Step 4', component: <Step4 />},
  {name: 'Step 5', component: <Step5 />}
];

export default class MobileCreateForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* components/_form.scss */
            <div className="">
                <StepZilla steps={steps}/>
            </div>
        );
    }
}
