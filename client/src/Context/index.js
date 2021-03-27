import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { APISettings } from '../config';

export const APIContext = React.createContext();

export const Provider = (props) => {

    const [ authenticatedUser, setAuthenticatedUser ] = useState(() => {
        return Cookies.getJSON('authenticatedUser') || null;
    });

    // handle API calls
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
        return fetch(url, options);
    };

    

    const getCourses = async () => {
        const response = await api('/courses',);
        return response.json();
    };

    const getCourse = async (id) => {
        const response = await api(`/courses/${id}`);
        return response.json().then(data => data);

    };

    const getUser = async (username, password) => {
        const response = await api('/users','GET', null, true, {username, password});
        if(response.status === 200){
            return response.json();
        } else if(response.status === 401){
            return null;
        } else {
            throw new Error();
        }
    };

    const createUser = async (user) => {
        const response = await api('/users', 'POST', user);
        return response;
    };

    const createCourse = async (courseData) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api('/courses', 'POST', courseData, true, {username, password});
        return response;
    };

    const updateCourse = async (courseData) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api(`/courses/${courseData.id}`, 'PUT', courseData, true, {username, password});
        return response;
    };

    const deleteCourse = async (id) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api(`/courses/${id}`, 'DELETE', null, true, {username, password});
        return response;
    };

    const signIn = async (username, password) => {
        const response = await getUser(username, password);
        try{
            const {user} = response;
            user.password = password;
            setAuthenticatedUser(user);
            const cookieOptions = { expires: 1 };
            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
            return response; 
        } catch(error){
            const errorResponse = {
                errors: ['Access Denied']
            }
            return errorResponse;
            
        }       
    };

    const signOut = () => {
        setAuthenticatedUser(null);
        Cookies.remove(authenticatedUser);
        console.log('Goodbye!');
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
                deleteCourse
            },
        }}>
        { props.children }
        </APIContext.Provider>
    );
};