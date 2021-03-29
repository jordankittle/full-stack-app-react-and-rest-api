import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { APISettings } from '../config';

export const APIContext = React.createContext();

export const Provider = (props) => {

    const [ authenticatedUser, setAuthenticatedUser ] = useState(() => {
        return Cookies.getJSON('authenticatedUser') || null;
    });

    // handle API calls then return the response
    const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = APISettings.apiBaseUrl + path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        options.url = url;
        
        if(body !== null){
            options.body = JSON.stringify(body);
        }

        if(requiresAuth){
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options)
    };

    
    // send a GET request to the '/courses' route using the api function
    // gets a list of all courses
    // returns the response
    const getCourses = async () => {
        const response = await api('/courses',);
        return response;
    };

    // send a GET request to the '/courses/:id' route using the api function
    // gets a single course by its ID passed to the id argument
    // returns the response received
    const getCourse = async (id) => {
        const response = await api(`/courses/${id}`);
        return response;
    };

    // send a GET request to the route '/users' using the api function
    // gets the data for a user that matches the email/username and password credentials supplied to thei rrespective arguments
    // returns the response received
    const getUser = async (username, password) => {
        const response = await api('/users','GET', null, true, {username, password});
        return response;
    };

    // send a POST request to the '/users' route using the api function
    // creates a new user using the user data supplied to the user argument
    // returns the response received
    const createUser = async (user) => {
        const response = await api('/users', 'POST', user);
        return response;
    };

    // send a POST request to the '/courses' route using the api function
    // creates a new course using the course data supplied ot the courseData argument
    // returns the response received
    const createCourse = async (courseData) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api('/courses', 'POST', courseData, true, {username, password});
        return response;
    };

    // send a PUT request to the '/courses/:id route using the api function
    // updates a course using the course data supplied to the courseData argument
    // returns the response received
    const updateCourse = async (courseData) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api(`/courses/${courseData.id}`, 'PUT', courseData, true, {username, password});
        return response;
    };

    // delete course by ID
    // sends a DELETE request to the '/courses/:id' route using the id supplied to the id argument
    // returns the response received
    const deleteCourse = async (id) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api(`/courses/${id}`, 'DELETE', null, true, {username, password});
        return response;
    };

    // sign in
    const signIn = async (emailAddress, password) => {
        let user;
        const response = await getUser(emailAddress, password);
        if(response.status === 200){
            await response.json().then(data => {
                user = data.user;
                user.password = password;
                setAuthenticatedUser(user);
                const cookieOptions = {expires: 1}
                Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
                
            })
            return user;
        } else if(response.status === 500) {
            return 500;
        } else {
            return "Login Failure";
        }
        
    };

    // test error handling
    const testError = async () => {
        await api('/test-error');
    };

    // sign out
    const signOut = () => {
        Cookies.remove('authenticatedUser');
        setAuthenticatedUser(null);
    };

    return(
        <APIContext.Provider value={{
            authenticatedUser,
            actions: {
                signIn,
                signOut,
                getCourses,
                getCourse,
                createUser,
                createCourse,
                updateCourse,
                deleteCourse,
                testError
            },
        }}>
        { props.children }
        </APIContext.Provider>
    );
};