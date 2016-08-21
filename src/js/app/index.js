import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './AppRouter';

const div = document.createElement("div");
div.setAttribute("id", "app");
document.body.appendChild(div);

const app = document.getElementById("app");

ReactDOM.render( <AppRouter />, app);