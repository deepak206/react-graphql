import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import preval from 'preval.macro'
const dateTimeStamp = preval`module.exports = new Date().getTime();`

console.log('%c Build: '+ new Date(dateTimeStamp) + ' ', 'background: #007fa3; color: #FFFFFF; font-size: 16px');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
