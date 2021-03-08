import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext();

export const UserWrapper = (props) => {
    const [authToken, setAuthToken] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState();
    const [role, setRole] = useState();
    const [strikeNumber, setStrikeNumber] = useState();

    useEffect(() => {
        const storageToken = window.localStorage.getItem('myToken');
        if(storageToken) {
            setAuthToken(storageToken);
            setIsConnected(true);
        } 
    },[]);

    useEffect(() => {
        if(authToken) {
            setIsConnected(true);           
            const decoded = jwt_decode(authToken);
            setEmail(decoded.email);
        } else {
            setIsConnected(false);
        }
    },[authToken]);


    useEffect(() => {
        async function getUserInfo() {
            if(email) {
                const result = await axios.get(`/api/user/email`, {
                    params: { 
                        email: `${email}`,
                    }
                });
                setName(result.data.name);
                setUserId(result.data.id);
                setRole(result.data.role);
                setStrikeNumber(result.data.strikeNumber);
            }
        }
        getUserInfo();
    },[email]);

    const logout = () => {
        window.localStorage.setItem('myToken', '');
        setAuthToken('');
        setName('');
        setUserId('');
        setRole('');
        setStrikeNumber('');
    }

    const value = { authToken, setAuthToken, name, userId, role, strikeNumber, email, logout, isConnected}
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );

}
