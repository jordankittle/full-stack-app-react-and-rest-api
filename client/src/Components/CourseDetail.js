import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { APIContext } from '../Context';
import ReactMarkdown from 'react-markdown';

function CourseDetail(){
    const  { id }  = useParams();
    const [course, setCourse] = useState();
    const [ showConfirmDelete, setShowConfirmDelete ] = useState(false);
    const { authenticatedUser, actions } = useContext(APIContext);

    const user = authenticatedUser || {id:null};

    const history = useHistory();
    
    useEffect( () => {
        const getCourse = async () => {
            await actions.getCourse(id)
                .then(response => {
                    if(response.status === 200){
                        response.json()
                        .then(data => setCourse(data.course))
                        
                    } else if(response.status === 404){
                        history.push('/notfound');
                    } else if(response.status === 500){
                        history.push('/error');
                    } else {
                        throw new Error('Unknown error getting course');
                    }
                })
        };
        getCourse();
    }, [actions, id, history]);

    const deleteCourse = () => {
        actions.deleteCourse(id)
            .then(response => {
                if(response.status === 204){
                    history.push('/');
                } else if(response.status === 403){
                    console.log('Access Denied');
                } else if(response.status === 500){
                    history.push('/error');
                } else {
                    throw new Error('Unkown error deleting course');
                }
            })
            .catch(error => {
                console.log(error);
            })
        ;
  
        //history.push('/');
    };

    if(course){
        return (
            <>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            user.id === +course.User.id ?
                                <>
                                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                    <DeleteConfirm 
                                        showConfirmDelete={showConfirmDelete} 
                                        setShowConfirmDelete={setShowConfirmDelete}
                                        deleteCourse={deleteCourse}
                                    />
                                </>
                            :
                                null

                        }
                        <Link className="button button-secondary" to="/">Return to List</Link>
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
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
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

function DeleteConfirm(props) {

    const {setShowConfirmDelete, deleteCourse, showConfirmDelete} = props;

    return (
        <>
            {    
                showConfirmDelete ?
                    <>
                        <button className="button button-cancel" onClick={() => setShowConfirmDelete(false)}>Keep Course</button>
                        <button className="button button-confirm" onClick={deleteCourse}>Confirm Delete</button>
                    </>
                :
                    <button className="button" onClick={() => setShowConfirmDelete(true)}>Delete Course</button>
            }
        </>
    );
}
export default CourseDetail;
