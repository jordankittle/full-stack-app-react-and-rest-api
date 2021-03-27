import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIContext } from '../Context';

import ShowErrors from './ShowErrors';

const UserSignUp = () => {
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ emailAddress, setEmailAddress ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ errors, setErrors ] =  useState([]);

    const { actions } = useContext(APIContext);

    const history = useHistory();

    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'firstName'){
            setFirstName(value);
        }
        if(name === 'lastName'){
            setLastName(value);
        }
        if(name === 'emailAddress'){
            setEmailAddress(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
        if(name === 'confirmPassword'){
            setConfirmPassword(value);
        }
    };

    const submit = (event) => {
        event.preventDefault();
        const user = {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            confirmPassword: confirmPassword,
            password: password,
        };
        actions.createUser(user)
            .then(response => {
                if(response.status === 201){
                    actions.signIn(emailAddress, password)
                        .then(() => {
                            history.push('/');
                        });
                } else if (response.status === 400){
                    response.json().then(data => {
                        setErrors(data.errors);
                    });
                } else if(response.status === 500){
                    history.push('/error');
                }
            })
            .catch((error) => {
                console.error(error);
                history.push('/error');
            });
    };

    const cancel = () => {
        history.push('/');
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ShowErrors errors={errors} />
            <form onSubmit={submit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" onChange={change} type="text" />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" onChange={change} type="text" />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" onChange={change} type="email" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" onChange={change} type="password" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" onChange={change} type="password" />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={cancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    );
};

export default UserSignUp;