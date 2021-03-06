import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/Home/Home';
import Habits from './pages/Home/Habits2';
import ManageFriends from './pages/Home/ManageFriends2';
import Feed from './pages/Home/Feed2';
import AccountSettings from './pages/Home/AccountSettings';
import Journal from './pages/Home/Journal';
import Mood from './pages/Home/Mood';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Verify from './pages/auth/Verify';
import LandingPage from './pages/LandingPage';
import requireLogin from './utils/requireLogin';
import { sync } from './redux/actions/authentication';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.onSync(this.props.userId);
    }
  }

  render() {
    const App = () => (
      <div>
        <Nav />
        <Switch>
          <div className="body-wrapper">
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={requireLogin(Home)} />
            <Route path="/habits" component={requireLogin(Habits)} />
            <Route path="/manage-friends" component={requireLogin(ManageFriends)} />
            <Route path="/settings" component={requireLogin(AccountSettings)} />
            <Route path="/feed" component={requireLogin(Feed)} />
            <Route path="/journal" component={requireLogin(Journal)} />
            <Route path="/mood" component={requireLogin(Mood)} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/reset/:token" component={Reset} />
            <Route path="/verify/:token" component={requireLogin(Verify)} />
          </div>
        </Switch>
        <Footer />

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
  userId: PropTypes.string,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
    userId: state.authState.userId,
  };
};

// Allows us to dispatch a login event by calling this.props.onLogin
const mapDispatchToProps = (dispatch) => {
  return {
    onSync: userId => dispatch(sync(userId)),
  };
};

// Redux config
App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default App;
