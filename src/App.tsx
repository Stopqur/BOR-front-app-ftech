import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import './App.css'
import { persistor } from './store/index'


function App() {
  return ( 
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <NavBar />
        <AppRouter />
      </PersistGate>
    </BrowserRouter>
  );
}

export default App;
