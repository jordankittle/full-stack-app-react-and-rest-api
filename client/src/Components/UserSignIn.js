import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const UserSignIn = () => {
    const [ emailAddress, setEmailAddress ] = useState();
    const [ password, setPassword ] = useState();
    const [ errors, setErrors ] =  useState();

    const history = useHistory();

    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'emailAddress'){
            setEmailAddress(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    };

    const signIn = () => {

    };

    const cancel = () => {
        history.push('/');
    };

    return (
        <div className="form--centered">
            <h2> Sign In</h2>
            <form>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" defaultValue="" />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secdonary" onClick={cancel()}>Cancel</button>

            </form>
            <p> Don't have a user account? Click here to <a href="/signup">sign up</a></p>
        </div>
    );

};

export default UserSignIn;