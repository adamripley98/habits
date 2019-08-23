import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SideNav extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 side-nav">
            <nav clasNames="navbar navbar-default navbar-fixed-side">
              <h4 className="gold-text">Personal</h4>
              <Link to="/stats" className="nav-link">Stats</Link>
              <Link to="/habits" className="nav-link">Habits</Link>
              <Link to="/todolist" className="nav-link">To Do List</Link>
              <Link to="/goals" className="nav-link">Goals</Link>
              <Link to="/journal" className="nav-link">Journal</Link>
              <h4 className="gold-text">Social</h4>
              <Link to="/feed" className="nav-link">Feed</Link>
              <Link to="/addfriends" className="nav-link">Add friends</Link>
              <Link to="/thoughts" className="nav-link">Thoughts</Link>
              <h4 className="gold-text">Account</h4>
              <Link to="/customize" className="nav-link">Customize Dashboard</Link>
              <Link to="/settings" className="nav-link">Account Settings</Link>
            </nav>
          </div>
          <div className="col-sm-10">
            {this.props.component}
          </div>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  userId: PropTypes.string,
  component: PropTypes.func,
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
