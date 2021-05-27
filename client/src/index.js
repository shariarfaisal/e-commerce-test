import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/style.scss'
import axios from 'axios'

// axios.defaults.baseURL = 'https://faisal-e-backend.herokuapp.com/'

axios.defaults.baseURL = 'http://localhost:4000/'

const adminToken = localStorage.getItem('x-admin-token')
if(adminToken){
  axios.defaults.headers.common['Authorization'] = adminToken
}


ReactDOM.render(
  <App />,
   document.getElementById('root')
);
