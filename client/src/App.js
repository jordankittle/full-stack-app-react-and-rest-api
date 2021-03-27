import './Components/global.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError';
import TestError from './Components/TestError';


function App() {

  return (
    <Router>
      
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Courses} />
            <PrivateRoute path='/courses/create' component={CreateCourse} />
            <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
            <Route path='/courses/:id' component={CourseDetail} />
            <Route path='/signin' component={UserSignIn} />
            <Route path='/signup' component={UserSignUp} />
            <Route path='/signout' component={UserSignOut} />
            <Route path='/notfound' component={NotFound} />
            <Route path='/forbidden' component={Forbidden} />
            <Route path='/test-error' component={TestError} />
            <Route path ='/error' component={UnhandledError} />
            <Route component={NotFound} />
            
          </Switch>        
        </main>
      
    </Router>
  );
  
}

export default App;
