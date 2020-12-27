import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NoLogin from './pages/NoLogin';
import { ProtectedRoute } from './ProtectedRoute';


function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/nologin" component={NoLogin} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />

      <Route path="*" component={() => <h1 align="center">404 Not Found</h1>} />
    </Switch>
  );
}

export default App;
