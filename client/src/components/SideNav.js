import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class SideNav extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-3 col-sm-4">
            <div className="side-nav">
              <nav className="pt-2">
                <h5 className="gold-text bold mb-3 pl-3">Personal</h5>
                <div className="nav-section">
                  <NavLink to="/home" className="nav-link">
                    <i className="fas fa-home" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Home
                  </NavLink>
                </div>
                <div className="nav-section">
                  <NavLink to="/habits" className="nav-link">
                    <i className="fas fa-check-circle" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Habits
                  </NavLink>
                </div>
                <div className="nav-section">
                  <NavLink to="/journal" className="nav-link">
                    <i className="fas fa-smile" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Track Mood
                  </NavLink>
                </div>
                <div className="nav-section">
                  <NavLink to="/journal" className="nav-link">
                    <i className="fas fa-book-open" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Journal
                  </NavLink>
                </div>
                <h5 className="gold-text bold mb-3 pl-3">Social</h5>
                <div className="nav-section">
                  <NavLink to="/feed" className="nav-link">
                    <i className="fas fa-hashtag" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Feed
                  </NavLink>
                </div>
                <div className="nav-section">
                  <NavLink to="/addfriends" className="nav-link">
                    <i className="fas fa-user-plus" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Manage friends
                  </NavLink>
                </div>
                <h5 className="gold-text bold mb-3 pl-3">Account</h5>
                <div className="nav-section">
                  <NavLink to="/settings" className="nav-link">
                    <i className="fas fa-user-cog" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Account Settings
                  </NavLink>
                </div>
                <div className="nav-section">
                  <NavLink to="/settings" className="nav-link">
                    <i className="fas fa-sign-out-alt" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Sign out
                  </NavLink>
                </div>
              </nav>
            </div>
          </div>
          <div className="col-lg-9 col-sm-8">
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
