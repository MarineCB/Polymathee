import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext();

export const UserWrapper = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        const storageToken = window.localStorage.getItem('myToken');
        console.log("in storage we have :",storageToken)
        if(storageToken) {
            setAuthToken(storageToken);
            setIsConnected(true);
        } 
    },[]);

    useEffect(() => {
        if(authToken) {
            setIsConnected(true);           
            const decoded = jwt_decode(authToken);
            console.log(decoded);
            setEmail(decoded.email);
        } else {
            setIsConnected(false);
        }
    },[authToken]);

    const logout = () => {
        window.localStorage.setItem('myToken', '');
        setAuthToken('');
        setFirstname('');
        setLastname('');
    }

    const value = { authToken, setAuthToken, firstname, lastname, setFirstname, setLastname, logout, isConnected}
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );

}