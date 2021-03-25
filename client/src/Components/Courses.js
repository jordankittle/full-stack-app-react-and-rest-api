import Course from './Course';
import { useState, useContext, useEffect } from 'react';
import { APIContext } from '../Context';

function Courses() {

    const [courses, setCourses] = useState();
    const { actions } = useContext(APIContext);
    
    useEffect( () => {
        const getCourses = async () => {
            await actions.getCourses()
                .then(data => setCourses(data.courses));
        };
        getCourses();
    }, [actions]);

    return (
    <div className="wrap main--grid">
        {
            courses?
                courses.map((course, index) => <Course key={index} course={course} />)
            :
                <span>Loading...</span>
        }
    </div>
    );
  
}

export default Courses;
