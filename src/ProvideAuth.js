import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const authContext = createContext();
export const baseRoute = 'https://mattia.hopto.org';

export default function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async ({ username, password }) => {
        await axios.post(`${baseRoute}/login`, {
            username: username,
            password: password
        })
            .then(function (response) {
                //console.log(response);
                const responseData = response.data;
                console.log(response.data);
                const { data } = responseData; // JWT
                console.log("pippolone", data);
                localStorage.setItem('token', data);
                setUser(JSON.parse(atob(localStorage.getItem('token').split('.')[1])));
                setToken(data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const logout = () => {
        localStorage.setItem('token', '');
    }
    const checkLogin = () => {
        if (isAuthenticated()) {
            const jwtToken = localStorage.getItem('token');
            setUser(JSON.parse(atob(jwtToken.split('.')[1])));
            setToken(jwtToken)
        }
    }


    const isAuthenticated = () => {
        const jwtToken = localStorage.getItem('token');
        // eslint-disable-next-line
        const re = new RegExp("^[A-Za-z0-9-_=]+1\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$");
        if (jwtToken === null || jwtToken === undefined || jwtToken === '' || jwtToken === 'null' || jwtToken === 'undefined' || !jwtToken.match(re)) {
            return false; // Non è presente un token
        }
        //setUser(atob(jwtToken.split('.')[1]));
        return true;    // È presente un token, la verifica della validità avviene server-side.
    }

    return {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        checkLogin
    };
}


export function getCurrentYear() {
    var dateObj = new Date();
    var year = dateObj.getUTCFullYear();

    const changeYear = new Date(`9/15/${year}`)

    const now = new Date()

    if (now < changeYear) return (parseInt(year) - 1) + "/" + year.toString().substring(2, 4);
    else return year + "/" + ((parseInt(year) + 1).toString().substring(2, 5))

}