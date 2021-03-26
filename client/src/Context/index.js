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
    const [ storedCredentials, setStoredCredentials ] = useState({});
    console.log('credentials: ', storedCredentials);

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
            // options.body = JSON.stringify(body);
            options.data = JSON.stringify(body);
        }

        if(requiresAuth){
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        //return axios(options);
        return fetch(url, options);
    };

    

    const getCourses = async () => {
        const response = await api('/courses',);
        return response.json();
        //return response.data;
    };

    const getCourse = async (id) => {
        const response = await api(`/courses/${id}`);
        // return response.json().then(data => data);
        // return response.then(data => data);
        return response.data;
    };

    const getUser = async (username, password) => {
        const response = await api('/users','GET', null, true, {username, password});
        if(response.status === 200){
            return response.json();
            //return response.data;
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
            // return response.json().then(data => data.errors);
            // return response.then(data => data.errors);
            return response.data.errors;
        } else {
            throw new Error();
        }
    };

    const createCourse = async (courseData) => {
        const { username, password } = storedCredentials;
        if(username && password){
            const response = await api('/courses', 'POST', courseData, true, {username, password});
            if(response.status === 201) {
                console.log('response:' , response);
                console.log('response.data: ', response.data);
                return response.data;
            } else if(response.status === 400){
                console.log(1);
                return response.json().then(data => data.errors);
                //const errors = response.data.errors.map(error => error.message);
                //return errors;
            } else {
                console.log(2);
                const error = new Error('Error response');
            return error.message;
            }
        } else {
            console.log(3);
            const error = new Error('Please log in again');
            return error.message;
            
        }
        
    };

    const signIn = async (username, password) => {
        const { user } = await getUser(username, password);
        if(user !== null){
            setAuthenticatedUser(user);
            const cookieOptions = { expires: 1 };
            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
            setStoredCredentials({
                username,
                password
            });
            
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