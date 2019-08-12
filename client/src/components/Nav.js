import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authentication';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.loggedInLinks = this.loggedInLinks.bind(this);
    // this.loggedOutLinks = this.loggedOutLinks.bind(this);
  }

  handleLogout() {
    this.props.onLogout();
  }

  loggedInLinks() {
    return (
      <button type="button" onClick={this.handleLogout}>
        Logout
      </button>
    );
  }

  loggedOutLinks() {
    return (
      <button type="button">
        Login
      </button>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark mb-3">
          {this.props.userId ? this.loggedInLinks() : this.loggedOutLinks()}
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {
  onLogout: PropTypes.func,
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
    onLogout: () => dispatch(logout()),
  };
};

// Redux config
Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

export default Nav;
