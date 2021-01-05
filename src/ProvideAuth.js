import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const authContext = createContext();

const loginRoute = 'https://gstpcto.eu-central-1.elasticbeanstalk.com/login';

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

    const login = async ({ username, password }) => {
        await axios.post(loginRoute, {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);
                const responseData = response.data;
                const { data } = responseData; // JWT
                // console.log(data);
                localStorage.setItem('token', data);
                setUser(atob(data.split('.')[1]));
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const logout = () => {
        localStorage.setItem('token', '');
    }

    const isAuthenticated = () => {
        const jwtToken = localStorage.getItem('token');
        // eslint-disable-next-line
        const re = new RegExp("^[A-Za-z0-9-_=]+1\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$");
        if (jwtToken === null || jwtToken === undefined || jwtToken === '' || jwtToken === 'null' || jwtToken === 'undefined' || !jwtToken.match(re)) {
            return false; // Non è presente un token
        }
        return true;    // È presente un token, la verifica della validità avviene server-side.
    }

    return {
        user,
        login,
        logout,
        isAuthenticated
    };
}
