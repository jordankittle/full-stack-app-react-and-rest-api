import Course from './Course';
import { useState, useContext, useEffect } from 'react';
import { APIContext } from '../Context';
import { Link, useHistory } from 'react-router-dom';

function Courses() {

    const [courses, setCourses] = useState();
    const { actions } = useContext(APIContext);

    const history = useHistory();
    
    // get courses data and load into state
    useEffect( () => {
        const getCourses = async () => {
            await actions.getCourses()
                .then(response => {
                    if(response.status === 200){
                        response.json().then(data => setCourses(data.courses));
                    } else if(response.status === 500){
                        history.push('/error');
                    } else {
                        throw new Error('Error getting courses');
                    }
                })
        };
        getCourses();
    }, [actions, history]);

    return (
    <div className="wrap main--grid">
        {
            courses?
                courses.map((course, index) => <Course key={index} course={course} />)
            :
                <span>Loading Courses...</span>
        }
        <Link className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
            New Course
            </span>
        </Link>
    </div>
    );
  
}

export default Courses;
