import React from 'react';
import { Route } from 'react-router-dom';
import auth from './auth';

export const ProtectedRoute = ({component : Component, ...rest}) => {
    return(
        <Route {...rest}
            render={
                props => {
                    if (auth.isAuthenticated()){
                        return <Component {...props}/>
                    } else {
                        // props.history.push("/nologin");
                        console.log(auth.isAuthenticated());
                    }
                }
            }
        />
    );
}