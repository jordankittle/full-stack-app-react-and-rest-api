import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIContext } from '../Context';

const UserSignIn = () => {
    const [ emailAddress, setEmailAddress ] = useState();
    const [ password, setPassword ] = useState();
    const [ errors, setErrors ] =  useState([]);

    const { actions } = useContext(APIContext);

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

    const submit = (event) => {
        event.preventDefault();
        actions.signIn(emailAddress, password)
            .then((user) => {
                if(user === null){
                    setErrors(['Sign-in was unsuccessful']);
                } else{
                    //set history from
                    console.log(user);
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