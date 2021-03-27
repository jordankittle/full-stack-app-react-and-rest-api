import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const TestError = () => {

    const history = useHistory();
    useEffect(() => {
        fetch('http://localhost:5000/test-error')
        .then(response => {
            if(response.status === 500){
                history.push('/error')
            }
        })
    ;
    });
    
    return (
        <div className="wrap">
            <h2>Testing Error</h2>
            <p>This page should trigger a 500 error response from the API. You should not see this.</p>
        </div>
    );
};

export default TestError;