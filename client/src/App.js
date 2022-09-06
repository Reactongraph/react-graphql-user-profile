import './App.css';
import NavBar from './components/NavBar'
import {routes} from './routes'
import { useRoutes } from 'react-router';
import React from 'react'

const App = () => {
   const element = useRoutes(routes)
   return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App

