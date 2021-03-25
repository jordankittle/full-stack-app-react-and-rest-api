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
                <span>Loading Courses...</span>
        }
        <a className="course--module course--add--module" href="/create-course">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
            New Course
            </span>
        </a>
    </div>
    );
  
}

export default Courses;
