import React, { useState } from 'react';
import { APISettings } from '../config';

export const APIContext = React.createContext();

export const Provider = (props) => {

    const title = "Welcome to the client";

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
        return response.json().then(data => data);
    };

    return(
        <APIContext.Provider value={{
            title,
            actions: {
                getCourses,
            },
        }}>
        { props.children }
        </APIContext.Provider>
    );

};