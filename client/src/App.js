import './Components/global.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { APIContext } from './Context';

import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

function App() {

  const { title }  = useContext(APIContext);
  return (
    <Router>
      
        <header>Header</header>
        <main>
          <Switch>
            <Route exact path='/' component={Courses} />
            <Route path='/courses/:id' component={CourseDetail} />
          </Switch>        
        </main>
      
    </Router>
  );
  
}

export default App;
