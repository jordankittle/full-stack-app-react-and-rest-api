import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { APISettings } from '../config';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



export const APIContext = React.createContext();

export const Provider = (props) => {

    const [ authenticatedUser, setAuthenticatedUser ] = useState(() => {
        return Cookies.getJSON('authenticatedUser') || null;
    });

    const history = useHistory();

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
        if(response.status === 201) {
            return [];
        } else if(response.status === 400){
            return response.json().then(data => data.errors);
  
        } else {
            throw new Error();
        }
    };

    const createCourse = async (courseData) => {
        const { emailAddress: username, password } = authenticatedUser;
        const response = await api('/courses', 'POST', courseData, true, {username, password});
        if(response.status === 201) {
            console.log(response.headers.get('Location'));
            return ('Course created');

        } else if(response.status === 400){
           return(response);
        } else {
            console.log(2);
            const error = new Error('Error response');
        return error.message;
        }

        
    };

    const signIn = async (username, password) => {
        const { user } = await getUser(username, password);
        if(user !== null){
            user.password = password;
            setAuthenticatedUser(user);
            const cookieOptions = { expires: 1 };
            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
            
        }
        return user;
    };

    return(
        <APIContext.Provider value={{
            authenticatedUser,
            actions: {
                signIn,
                getCourses,
                getCourse,
                createUser,
                createCourse,
            },
        }}>
        { props.children }
        </APIContext.Provider>
    );
};