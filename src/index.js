import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "finsta-57b8b.firebaseapp.com",
  databaseURL: "https://finsta-57b8b.firebaseio.com",
  projectId: "finsta-57b8b",
  storageBucket: "finsta-57b8b.appspot.com",
  messagingSenderId: "575904260086",
  appId: "1:575904260086:web:efd7f591e1b5308940b1d7"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
