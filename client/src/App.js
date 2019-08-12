import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Nav from './components/Nav';
import requireLogin from './utils/requireLogin';
import { sync } from './redux/actions/authentication';

class App extends Component {
  componentDidMount() {
    this.props.onSync();
  }

  render() {
    const App = () => (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={requireLogin(Home)} />
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

App.propTypes = {
  onSync: PropTypes.func,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
  };
};

// Allows us to dispatch a login event by calling this.props.onLogin
const mapDispatchToProps = (dispatch) => {
  return {
    onSync: () => dispatch(sync()),
  };
};

// Redux config
App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
