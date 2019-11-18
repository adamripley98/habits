import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authentication';
import Logo from '../images/logo.png';
import Default from '../images/default-profile.jpg';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.loggedInLinks = this.loggedInLinks.bind(this);
  }

  handleLogout() {
    this.props.onLogout();
  }

  loggedInLinks() {
    return (
      <div className="dropdown dropleft">
        <img src={Default} alt="default" className="profile-pic dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={this.handleLogout}>
          <a className="dropdown-item" href="#i">Logout</a>
        </div>
      </div>
    );
  }

  loggedOutLinks() {
    return (
      <button type="button" className="btn-nav">JOIN WAITLIST</button>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark mb-3">
          <img src={Logo} alt="logo" className="logo" />
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
