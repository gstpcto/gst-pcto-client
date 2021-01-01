import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NoLogin from './pages/NoLogin';
import { PrivateRoute } from './PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route path="/nologin">
          <NoLogin />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
