import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

export const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    auth.isAuthenticated() ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/nologin',
                                    state: { from: location },
                                }}
                            />
                        )
            }
        />
    );
}
