import React, { useState } from 'react';
import { APISettings } from '../config';

export const APIContext = React.createContext();

export const Provider = (props) => {

    const [ authenticatedUser, setAuthenticatedUser ] = useState();

    // handle API calls
    const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = APISettings.apiBaseUrl + path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        
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
        console.log(username, password);
        const response = await api('/users','GET', null, true, {username, password});
        if(response.status === 200){
            return response.json();
        } else if(response.status === 401){
            return null;
        } else {
            throw new Error();
        }
    };

    const signIn = async (username, password) => {
        const user = await getUser(username, password);
        if(user !== null){
            setAuthenticatedUser(user);
        }
        return user;
    };

    return(
        <APIContext.Provider value={{
            actions: {
                getCourses,
                getCourse,
                signIn,
            },
        }}>
        { props.children }
        </APIContext.Provider>
    );
};