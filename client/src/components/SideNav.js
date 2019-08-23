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
            <nav clasNames="navbar navbar-default navbar-fixed-side">
              <h5 className="gold-text bold">Personal</h5>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/habits" className="nav-link">Habits</Link>
              <Link to="/todolist" className="nav-link">To Do List</Link>
              <Link to="/goals" className="nav-link">Goals</Link>
              <Link to="/journal" className="nav-link">Journal</Link>
              <br />
              <h5 className="gold-text bold">Social</h5>
              <Link to="/feed" className="nav-link">Feed</Link>
              <Link to="/addfriends" className="nav-link">Add friends</Link>
              <Link to="/thoughts" className="nav-link">Thoughts</Link>
              <br />
              <h5 className="gold-text bold">Account</h5>
              <Link to="/customize" className="nav-link">Customize Dashboard</Link>
              <Link to="/settings" className="nav-link">Account Settings</Link>
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
