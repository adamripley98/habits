import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Adam from '../../images/adampic.jpg';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  showBasicSettings() {
    return (
      <div className="category-card p-3">
        <h3 className="card-title">Basic Information</h3>
        <div className="line" />
        <div className="setting-section">
          <div>
            <p className="bold mb-0">Full Name</p>
            <p className="mb-2">Adam Ripley</p>
          </div>
          <div className="edit-link">
            <i className="far fa-edit" />
            <p>Edit</p>
          </div>
        </div>
        <div className="line" />
        <div className="setting-section">
          <div>
            <p className="bold mb-0">Password</p>
            <p className="mb-2">&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</p>
          </div>
          <div className="edit-link">
            <i className="far fa-edit" />
            <p>Edit</p>
          </div>
        </div>
        <div className="line" />
        <div className="setting-section">
          <div>
            <p className="bold mb-0">Profile Picture</p>
            <img src={Adam} alt="change-pic" className="change-pic" />
          </div>
          <div className="edit-link mt-4">
            <i className="far fa-edit" />
            <p>Edit</p>
          </div>
        </div>
        <div className="line" />
        <div className="setting-section">
          <div>
            <p className="bold mb-0">Location</p>
            <p className="mb-2">Anchorage, AK</p>
          </div>
          <div className="edit-link">
            <i className="far fa-edit" />
            <p>Edit</p>
          </div>
        </div>
        <div className="line" />
        <div className="setting-section">
          <div>
            <p className="bold mb-0">Bio</p>
            <p className="mb-2">Hello I'm a lifting bro from AK and i finna meet gurlz</p>
          </div>
          <div className="edit-link">
            <i className="far fa-edit" />
            <p>Edit</p>
          </div>
        </div>
      </div>
    );
  }

  showNotificationSettings() {
    return (
      <div className="category-card p-3">
        <h3 className="navy-text bold pb-2 pl-3 pt-1">Notification Preferences</h3>
        <div className="line" />
      </div>
    );
  }

  showPrivacySettings() {
    return (
      <div className="category-card p-3">
        <h3 className="navy-text bold pb-2 pl-3 pt-1">Privacy Settings</h3>
        <div className="line" />
      </div>
    );
  }

  showContent() {
    return (
      <div>
        <ErrorMessage error={this.props.error} />
        <div className="row">
          <div className="col-lg-6">
            {this.showBasicSettings()}
          </div>
          <div className="col-lg-6">
            {this.showNotificationSettings()}
          </div>
          <div className="col-lg-6">
            {this.showPrivacySettings()}
          </div>
        </div>
      </div>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="header-container mb-3">
          <h1 className="header-title">Account Settings</h1>
        </div>
        {this.props.pending ? (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        ) : this.showContent()}
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <SideNav component={this.displayComponent()} />
      </div>
    );
  }
}

AccountSettings.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    error: state.friendState.error, // TODO not friendState
    pending: state.friendState.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

AccountSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSettings);

export default AccountSettings;