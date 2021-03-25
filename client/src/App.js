import './Components/global.css';
import React, { useContext } from 'react';
import { APIContext } from './Context';
import Courses from './Components/Courses';

function App() {

  const { title }  = useContext(APIContext);
  console.log(title);
  return (
    <div className="App">
      <Courses />
    </div>
  );
  
}

export default App;
