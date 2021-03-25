import './Components/global.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { APIContext } from './Context';
import Courses from './Components/Courses';

function App() {

  const { title }  = useContext(APIContext);
  return (
    <Router>
      <div>
        <Route exact path='/' component={Courses} />
      </div>
    </Router>
  );
  
}

export default App;
