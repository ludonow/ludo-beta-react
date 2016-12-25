import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './AppRouter';

const rwdMeta = document.createElement('meta');
rwdMeta.name = 'viewport';
rwdMeta.content = 'width=device-width, initial-scale=1.0';

const head = document.getElementsByTagName('head')[0].appendChild(rwdMeta);

const div = document.createElement("div");
div.setAttribute("id", "app");
document.body.appendChild(div);

const app = document.getElementById("app");

ReactDOM.render( <AppRouter />, app);