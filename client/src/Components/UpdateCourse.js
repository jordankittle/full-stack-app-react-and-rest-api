import { useState, useContext, useEffect } from 'react';
import { APIContext } from '../Context';
import { useHistory, useParams } from 'react-router-dom';

import CourseForm from './CourseForm';

const UpdateCourse = () => {
    
    const  { id }  = useParams();
    const [course, setCourse] = useState();
    const [ courseTitle, setCourseTitle ] = useState('');
    const [ courseAuthor, setCourseAuthor ] = useState('');
    const [ courseDescription, setCourseDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState('');
    const [ materialsNeeded, setMaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const { authenticatedUser, actions } = useContext(APIContext);
    
    const history = useHistory();

    // get course data and populate the form fields with existing information
    // check to see if the course owner is the same as the currently authenticated user
    // if the course is not owned by the authenticated user, send to '/forbidden' route
    useEffect( () => {
        (async () => {
            await actions.getCourse(id)
                .then(response => {
                    if(response.status === 200){
                        response.json()
                            .then(data => {
                                setCourse(data.course);
                                return data.course;
                            })
                            .then((course)=> {
                                setCourseTitle(course.title);
                                setCourseAuthor(`${course.User.firstName} ${course.User.lastName}`);
                                setCourseDescription(course.description);
                                setEstimatedTime(course.estimatedTime);
                                setMaterialsNeeded(course.materialsNeeded);
                                return course;
                            })
                            .then(course => {
                                if(course.userId !== authenticatedUser.id){
                                    history.push('/forbidden');
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                            
                    } else if(response.status === 404){
                        history.push('/notfound');
                    } else if(response.status === 500){
                        history.push('/error');        
                    } else {
                        throw new Error('Error getting course')
                    }
                })
                
        })();
        
    }, [actions, id, history, authenticatedUser.id]);
    
    // submit course data to be updated
    const submit = () => {
        const courseData = {
            id,
            userId: course.userId,
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
        };
        actions.updateCourse(courseData)
            .then(response => {
                if(response.status === 204){
                    history.push(`/courses/${id}`)
                } else if (response.status === 400){
                    response.json().then(data => {
                        setErrors(data.errors);
                    });
                } else if(response.status === 403) {
                    response.json().then(data => {
                        setErrors(['You are not the owner of this course']);
                    })
                } else if(response.status === 500) {
                    history.push('/error');
                } else {
                    throw new Error('Unknown error from updateCourse()');
                }
            })
            .catch(error => {
                console.log('Error: ', error);
                setErrors(error);
            })
        ;

    };

    const cancel = () => {
        history.push('/');
    };

    // update course data in state on input field change
    const change = (event) => {
        const value = event.target.value;
        switch(event.target.name){
            case "courseTitle":
                setCourseTitle(value);
                break;
            case "courseAuthor":
                setCourseAuthor(value);
                break;
            case "courseDescription":
                setCourseDescription(value);
                break;
            case "estimatedTime":
                setEstimatedTime(value);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(value);
                break;
            default:
                break;
        }
    };

    return(
        <div className="wrap">
            <h2>Update Course</h2>
            <CourseForm 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitText="Update Course"
                elements={() => (
                    <>
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input type="text" id="courseTitle" name="courseTitle" onChange={change} value={courseTitle}  />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input type="text" id="courseAuthor" name="courseAuthor" value={courseAuthor} readOnly />

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change} value={courseDescription}></textarea>

                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input type="text" id="estimatedTime" name="estimatedTime" onChange={change} value={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded}></textarea>
                        </div>                    
                    </>
                )}
            />
        </div>
    );

};

export default UpdateCourse;