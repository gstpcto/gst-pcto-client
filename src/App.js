import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Switch>
      <Route exact path="/signin" render={(props) => <SignIn {...props} />} />

      <Route exact path="/">
        <Homepage />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
}

export default App;
