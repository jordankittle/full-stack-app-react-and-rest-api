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

    useEffect( () => {
        (async () => {
            await actions.getCourse(id)
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
                })
        })();
        
    }, [actions, id]);
    
    const submit = (event) => {
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
                } else if (response.status === 403){
                    response.json().then(data => {
                        setErrors([data.message]);
                    });
                } else {
                    throw new Error('Unknown error from updateCourse()');
                }
            })
            .catch(error => {
                console.log('Error: ', error);
                setErrors(error);
                //history.push('/error')
            })
        ;

    };

    const cancel = () => {
        history.push('/');
    };

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
                            <input type="text" id="courseAuthor" name="courseAuthor" value={courseAuthor} />

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