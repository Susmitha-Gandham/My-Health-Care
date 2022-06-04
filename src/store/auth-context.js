import React from 'react';
import { useState } from 'react';
const AuthContext = React.createContext({
    token:'',
    isloggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
}

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userLoggedIn = !!token;

    const logutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginHandler = (token/*, expirationTime*/) => {
        setToken(token);
        localStorage.setItem('token', token);

        //const remainingTime = calculateRemainingTime(calculateRemainingTime);

        setTimeout(logutHandler, 600000);
    }

    const contextValue = {
        token: token,
        isloggedIn: userLoggedIn,
        login: loginHandler,
        logout: logutHandler
    };


    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;