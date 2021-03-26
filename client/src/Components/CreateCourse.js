import { useState, useContext } from 'react';
import { APIContext } from '../Context';
import { useHistory } from 'react-router-dom';

import CourseForm from './CourseForm';

const CreateCourse = () => {

    const [ courseTitle, setCourseTitle ] = useState();
    const [ courseAuthor, setCourseAuthor ] = useState();
    const [ courseDescription, setCourseDescription ] = useState();
    const [ estimatedTime, setEstimatedTime ] = useState();
    const [ materialsNeeded, setMaterialsNeeded ] = useState();
    const [ errors, setErrors ] = useState([]);
    
    const history = useHistory();

    const submit = (event) => {

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
            case "estimtedTime":
                setEstimatedTime(value);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(value);
                break;
        }
    };

    return(
        <div className="wrap">
            <h2>Create Course</h2>
            <CourseForm 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitText="Create Course"
                elements={() => (
                    <>
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" onChange={change} type="text" />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" onChange={change} type="text" />

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change}></textarea>

                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" onChange={change} type="text" />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change}></textarea>
                        </div>                    
                    </>
                )}
            />
        </div>
    );

};

export default CreateCourse;