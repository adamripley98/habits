import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
