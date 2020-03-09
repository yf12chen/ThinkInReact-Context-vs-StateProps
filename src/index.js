import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VersionContext from './VersionContext';
import VersionStateProps from './VersionStateProps';
import * as serviceWorker from './serviceWorker';




const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Mechanical', price: '$9.99', stocked: true, name: 'Valve' },
    { category: 'Video Game', price: '$39.99', stocked: true, name: 'RR2' },
    { category: 'Video Game', price: '$39.99', stocked: true, name: 'GTAV' },
    { category: 'Mechanical', price: '$8.99', stocked: true, name: 'Pump' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
];


ReactDOM.render(<VersionContext products={PRODUCTS} />, document.getElementById('root'));
//ReactDOM.render(<VersionStateProps products={PRODUCTS} />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
