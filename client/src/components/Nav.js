import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import { logout } from '../redux/actions/authentication';
import Logo from '../images/logo.png';
import Default from '../images/default-profile.jpg';
import Adam from '../images/adampic.jpg';

const CUT_OFF_POINT = 990;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.updateWidth = this.updateWidth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loggedInLinks = this.loggedInLinks.bind(this);
    this.showOnSmall = this.showOnSmall.bind(this);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  handleLogout() {
    this.props.onLogout();
  }

  // Hamburger menu should only be shown on small screens
  showOnSmall() {
    return (
      <div className="m-0 p-0 d-flex justify-content-center">
        <button
          className="navbar-toggler first-button il-block pr-025"
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent20">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
          </ul>
        </div>
      </div>
    );
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
        {this.state.width > CUT_OFF_POINT ? null : this.showOnSmall()}
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
      <div>
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <NavLink to="/" className="logo-link">
            <img src={Logo} alt="logo" className="logo" />
          </NavLink>
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

// Javascript for hamburger animation
$(document).ready(function () {
  $('.first-button').on('click', function () {
    $('.animated-icon1').toggleClass('open');
  });
});

export default Nav;
