import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
require('dotenv').config()

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');  // get the base url of app (/)

const rootElement = document.getElementById('root');

/*Enclosing app in BrowserRouter to make use of react-router-dom features*/
ReactDOM.render(
  <BrowserRouter basename={baseUrl}>  
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
