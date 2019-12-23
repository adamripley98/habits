import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SideNav extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 side-nav">
            <nav>
              <h5 className="gold-text bold">Personal</h5>
              <div className="nav-section">
                <Link to="/home" className="nav-link">
                  <i className="fas fa-home" />
                  &nbsp;&nbsp;Home
                </Link>
              </div>
              <div className="nav-section">
                <Link to="/habits" className="nav-link">
                  <i className="fas fa-check-circle" />
                  &nbsp;&nbsp;Habits
                </Link>
              </div>
              <div className="nav-section">
                <Link to="/journal" className="nav-link">
                  <i className="fas fa-book-open" />
                  &nbsp;&nbsp;Journal
                </Link>
              </div>
              <br />
              <h5 className="gold-text bold">Social</h5>
              <div className="nav-section">
                <Link to="/addfriends" className="nav-link">
                  <i className="fas fa-user-plus" />
                  &nbsp;&nbsp;Manage friends
                </Link>
              </div>
              <div className="nav-section">
                <Link to="/feed" className="nav-link">
                  <i className="fas fa-hashtag" />
                  &nbsp;&nbsp;Feed
                </Link>
              </div>
              <br />
              <h5 className="gold-text bold">Account</h5>
              <div className="nav-section">
                <Link to="/settings" className="nav-link">
                  <i className="fas fa-user-cog" />
                  &nbsp;&nbsp;Account Settings
                </Link>
              </div>
              <div className="nav-section">
                <Link to="/settings" className="nav-link">
                  <i className="fas fa-sign-out-alt" />
                  &nbsp;&nbsp;Sign out
                </Link>
              </div>
            </nav>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8">
            {this.props.component}
          </div>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  userId: PropTypes.string,
  component: PropTypes.object,
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
  };
};

// Redux config
SideNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);

export default SideNav;
