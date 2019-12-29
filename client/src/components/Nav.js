import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import { logout } from '../redux/actions/authentication';
import Logo from '../images/logo.png';
import Adam from '../images/adampic.jpg';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.loggedInLinks = this.loggedInLinks.bind(this);
  }

  handleLogout() {
    this.props.onLogout();
  }

  // Links to be shown only if a user is logged in
  loggedInLinks() {
    return (
      <div className="m-0 p-0 d-flex justify-content-center">
        <div className="dropdown il-block m-0 p-0">
          <a className="p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <img src={Adam} alt="default" className="profile-pic" />
          </a>
          <div className="dropdown-menu dropdown-menu-right" onClick={this.handleLogout}>
            <a className="dropdown-item" href="#">Sign Out</a>
          </div>
        </div>
      </div>
    );
  }

  // Links to show someone who is not logged in
  loggedOutLinks() {
    return (
      <button type="button" className="btn-nav">JOIN WAITLIST</button>
    );
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <NavLink to="/" className="logo-link">
          <img src={Logo} alt="logo" className="logo" />
        </NavLink>
        <div className="dropdown il-block m-0 p-0 show-on-large">
          <a className="p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <img src={Adam} alt="default" className="profile-pic" />
          </a>
          <div className="dropdown-menu dropdown-menu-right" onClick={this.handleLogout}>
            <a className="dropdown-item" href="#">Sign Out</a>
          </div>
        </div>
        <button
          className="navbar-toggler first-button il-block pr-025 show-on-small"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent20"
          aria-controls="navbarSupportedContent20"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="animated-icon1">
            <span />
            <span />
            <span />
          </div>
        </button>
        <div className="collapse navbar-collapse show-on-small ml-3" id="navbarSupportedContent20">
          <ul className="navbar-nav mt-4 mb-4">
            <h5 className="gold-text bold mb-2">Personal</h5>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/home" className="nav-link">
                <i className="fas fa-home mr-3" />
                Home
              </NavLink>
            </li>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/habits" className="nav-link">
                <i className="fas fa-check-circle mr-3" />
                Habits
              </NavLink>
            </li>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/mood" className="nav-link">
                <i className="fas fa-smile mr-3" />
                Track Mood
              </NavLink>
            </li>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/journal" className="nav-link">
                <i className="fas fa-book-open mr-3" />
                Journal
              </NavLink>
            </li>
            <h5 className="gold-text bold mb-2">Social</h5>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/feed" className="nav-link">
                <i className="fas fa-hashtag mr-3" />
                Feed
              </NavLink>
            </li>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/manage-friends" className="nav-link">
                <i className="fas fa-user-plus mr-3" />
                Manage Friends
              </NavLink>
            </li>
            <h5 className="gold-text bold mb-2">Account</h5>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <NavLink to="/settings" className="nav-link nav-link">
                <i className="fas fa-user-cog mr-3" />
                Account Settings
              </NavLink>
            </li>
            <li className="nav-section" data-toggle="collapse" data-target=".navbar-collapse">
              <div className="nav-link" onClick={this.handleLogout}>
                <i className="fas fa-sign-out-alt mr-3" />
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </nav>
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

// Javascript for hamburger animation
$(document).ready(function () {
  $('.first-button').on('click', function () {
    $('.animated-icon1').toggleClass('open');
  });
  $('.nav-section').on('click', function () {
    $('.animated-icon1').toggleClass('open');
  });
});

export default Nav;
