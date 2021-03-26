import './Components/global.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { APIContext } from './Context';
import PrivateRoute from './PrivateRoute';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';


function App() {

  return (
    <Router>
      
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Courses} />
            <PrivateRoute path='/courses/create' component={CreateCourse} />
            <Route path='/courses/:id' component={CourseDetail} />
            <Route path='/signin' component={UserSignIn} />
            <Route path='/signup' component={UserSignUp} />
            
          </Switch>        
        </main>
      
    </Router>
  );
  
}

export default App;
