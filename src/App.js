import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NoLogin from './pages/NoLogin';
import { ProtectedRoute } from './ProtectedRoute';
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

        <ProtectedRoute exact path="/dashboard" component={Dashboard} />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
