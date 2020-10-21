import React, { Fragment } from 'react';
import './App.css';
import Dash from './components/Dash'
import PhotoStream from './components/PhotoStream'

function App() {
  return (
    <Fragment>
      <Dash/>
      <PhotoStream/>
    </Fragment>
  );
}

export default App;
