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
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';

function App() {

  return (
    <Router>
      
        <header>Header</header>
        <main>
          <Switch>
            <Route exact path='/' component={Courses} />
            <Route path='/courses/:id' component={CourseDetail} />
            <Route path='/signin' component={UserSignIn} />
            <Route path='/signup' component={UserSignUp} />
            
          </Switch>        
        </main>
      
    </Router>
  );
  
}

export default App;
