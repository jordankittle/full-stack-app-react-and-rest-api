import { useState, useContext } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { APIContext } from '../Context';
import ShowErrors from './ShowErrors';

const UserSignIn = () => {
    const [ emailAddress, setEmailAddress ] = useState();
    const [ password, setPassword ] = useState();
    const [ errors, setErrors ] =  useState([]);   

    const { actions } = useContext(APIContext);

    const history = useHistory();
    let location = useLocation();

    const change = (event) => {
        const value = event.target.value;
        switch(event.target.name){
            case "emailAddress":
                setEmailAddress(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const submit = (event) => {
        event.preventDefault();
        const { from } = location.state || { from: { pathname: '/'} };

        actions.signIn(emailAddress, password)
            .then((response) => {
                try {
                    const { user, errors } = response;
                    if(!user){
                        setErrors(errors);
                    } else{
                        history.push(from);
                    }
                } catch(err) {
                    setErrors(['Error signing in']);
                }
                
            })
            .catch((error) => {
                console.error(error);
                history.push('/error');
            })
    };

    const cancel = () => {
        history.push('/');
    };

    return (
        <div className="form--centered">
            <h2> Sign In</h2>
            <ShowErrors errors={errors} title="Log-in Errors" />
            <form onSubmit={submit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" onChange={change} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={change} />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secdonary" onClick={cancel}>Cancel</button>

            </form>
            <p> Don't have a user account? Click here to <a href="/signup">sign up</a></p>
        </div>
    );

};

export default UserSignIn;