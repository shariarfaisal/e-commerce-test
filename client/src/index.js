import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/style.scss'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/'

const token = localStorage.getItem('x-user-token')
if(token){
  axios.defaults.headers['Authorization'] = token
}

ReactDOM.render(
  <App />,
   document.getElementById('root')
);
