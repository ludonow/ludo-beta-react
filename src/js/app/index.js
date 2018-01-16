import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';

const rwdMeta = document.createElement('meta');
rwdMeta.name = 'viewport';
rwdMeta.content = 'width=device-width, initial-scale=1.0';
const head = document.getElementsByTagName('head')[0].appendChild(rwdMeta);

/* add Metatag */
// const Metatitle = document.createElement('meta');
// Metatitle.name = 'og:title';
// Metatitle.content = 'LUDO Now 如荼生活';
// const headMetatitle = document.getElementsByTagName('head')[0].appendChild(Metatitle);

// const Metadescription = document.createElement('meta');
// Metadescription.name = 'og:description';
// Metadescription.content = 'LUDO 是一種對生活的態度：生活遊戲化。 我們將提供一個平台網站讓生活中的困難點能被有趣地解決';
// const headMetadescription = document.getElementsByTagName('head')[0].appendChild(Metadescription);

// const Metatype = document.createElement('meta');
// Metatype.name = 'og:type';
// Metatype.content = 'website';
// const headMetatype = document.getElementsByTagName('head')[0].appendChild(Metatype);

// const Metaimg = document.createElement('meta');
// Metaimg.name = 'og:image';
// Metaimg.content = '../../images/favicon.png';
// const headMetaimg = document.getElementsByTagName('head')[0].appendChild(Metaimg);

/* add favIcon */
/* <link rel="shortcut icon" href="./images/favicon.png"> */
// const faveIcon = document.createElement('link');
// faveIcon.setAttribute('rel', 'shortcut icon');
// faveIcon.setAttribute('href', '../../images/favicon.png');
// const headFav = document.getElementsByTagName('head')[0].appendChild(faveIcon);

const div = document.createElement("div");
div.setAttribute("id", "app");
document.body.appendChild(div);

const app = document.getElementById("app");
ReactDOM.render(
    <AppRouter />,
    app
);
