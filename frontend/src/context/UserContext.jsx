import React, { useState, useEffect, createContext } from 'react';

export const UserContext = createContext();

export const UserWrapper = (props) => {
    const [username, setUsername] = useState('');
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const storageToken = window.localStorage.getItem('myToken');
        console.log("in storage we have :",storageToken)
        //trigger this only if user just arrived on Homepage + token stored in localStorage still usable
        if(storageToken) {
            setAuthToken(storageToken);
        }
    },[]);
    

    const logout = () => {
        window.localStorage.setItem('myToken', '');
        setAuthToken('');
        setUsername('');
    }

    const value = { authToken, setAuthToken, username, setUsername, logout}
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );

}