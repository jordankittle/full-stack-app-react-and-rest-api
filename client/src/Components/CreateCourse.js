import { useState, useContext } from 'react';
import { APIContext } from '../Context';
import { useHistory } from 'react-router-dom';

import CourseForm from './CourseForm';

const CreateCourse = () => {

    const [ title, setTitle ] = useState();
    const [ author, setAuthor ] = useState();
    const [ description, setDescription ] = useState();
    const [ estTime, setEstTime ] = useState();
    const [ materialsNeeded, setMaterialsNeeded ] = useState();
    const [ errors, setErrors ] = useState([]);
    
    const history = useHistory();

    const submit = (event) => {

    };

    const cancel = () => {
        history.push('/');
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
                            <input id="courseTitle" name="courseTitle" type="text" />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" />

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>

                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estiamtedTime" type="text" />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>                    
                    </>
                )}
            />
        </div>
    );

};

export default CreateCourse;