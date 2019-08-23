import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SideNav extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-lg-1 side-nav">
            <nav clasNames="navbar navbar-default navbar-fixed-side">
              <p>Stats</p>
              <p>Journal</p>
              <p>Social</p>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
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
  };
};

// Redux config
SideNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);

export default SideNav;
