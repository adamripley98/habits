import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../redux/actions/authentication';

const CUT_OFF_POINT = 990;

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.updateWidth = this.updateWidth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  render() {
    return (
      <div>
        <div className={this.state.width > CUT_OFF_POINT ? 'row' : ''}>
          <div className={this.state.width > CUT_OFF_POINT ? 'col-lg-3 col-sm-4' : 'hidden'}>
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
                  <NavLink to="/manage-friends" className="nav-link">
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
                  <div className="nav-link" onClick={this.handleLogout}>
                    <i className="fas fa-sign-out-alt" />
                    &nbsp;&nbsp;&nbsp;&nbsp;Sign out
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className={this.state.width > CUT_OFF_POINT ? 'col-lg-9 col-sm-8' : ''}>
            {this.props.component}
          </div>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  onLogout: PropTypes.func,
  component: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    userId: state.authState.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

SideNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);

export default SideNav;
