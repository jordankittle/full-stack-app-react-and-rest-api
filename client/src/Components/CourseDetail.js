import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { APIContext } from '../Context';

function CourseDetail(){
    const  { id }  = useParams();
    const [course, setCourse] = useState();
    const { actions } = useContext(APIContext);
    
    useEffect( () => {
        const getCourse = async () => {
            await actions.getCourse(id)
                .then(data => setCourse(data.course));
        };
        getCourse();
    }, [actions, id]);

    if(course){
        return (
            <>
                <div className="actions--bar">
                    <div className="wrap">
                        <a className="button" href={`/courses/${course.id}/update`}>Update Course</a>
                        <button className="button" href="#">Delete Course</button>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                                <p>{course.description}</p>
                            </div>
                            <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>{course.materialsNeeded}</li>
                            </ul>
                        </div>
                        </div>
                        
                    </form>
                </div>
                
            </>
        );

    } else {
        return (
            <>
                <span>Loading...</span>
            </>
        );
    }
}

export default CourseDetail;
