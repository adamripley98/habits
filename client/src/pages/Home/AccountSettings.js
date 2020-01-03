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
    this.state = {
      editting: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleEdit(name) {
    this.setState({
      editting: name,
    });
  }

  showBasicSettings() {
    return (
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="card-title">Basic Information</h3>
        </div>
        <div className="category-card-body">
          {
            this.state.editting === 'name' ? (
              <div className="setting-section">
                <div>
                  <p className="bold">Full Name</p>
                  <input type="text" className="form-control" name="full-name" value="Adam Ripley" />
                </div>
                <button type="button" className="btn btn-primary btn-save" onClick={() => this.setState({ editting: null })}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="setting-section">
                <div>
                  <p className="bold">Full Name</p>
                  <p>Adam Ripley</p>
                </div>
                <div className="edit-link" onClick={() => this.handleEdit('name')}>
                  <i className="far fa-edit" />
                  <p>Edit</p>
                </div>
              </div>
            )
          }
          <div className="line" />
          <div className="setting-section">
            <div>
              <p className="bold">Password</p>
              <p>&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</p>
            </div>
            <div className="edit-link">
              <i className="far fa-edit" />
              <p>Edit</p>
            </div>
          </div>
          <div className="line" />
          <div className="setting-section">
            <div>
              <p className="bold">Profile Picture</p>
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
              <p className="bold">Location</p>
              <p>Anchorage, AK</p>
            </div>
            <div className="edit-link">
              <i className="far fa-edit" />
              <p>Edit</p>
            </div>
          </div>
          <div className="line" />
          <div className="setting-section">
            <div>
              <p className="bold">Bio</p>
              <p>Hello I'm a lifting bro from AK and i finna meet gurlz because gurlz are sick and im a lifting bro</p>
            </div>
            <div className="edit-link">
              <i className="far fa-edit" />
              <p>Edit</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  showNotificationSettings() {
    return (
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="card-title">Notifications & Privacy</h3>
        </div>
        <div className="category-card-body">
          <div className="setting-section">
            <div>
              <p className="bold">App Notifications</p>
              <p>New posts, likes/comments, friend requests</p>
            </div>
            <div className="edit-link">
              <i className="far fa-edit" />
              <p>Edit</p>
            </div>
          </div>
          <div className="line" />
          <div className="setting-section">
            <div>
              <p className="bold">Email Notifications</p>
              <p>Dayli news, reminders, friend requests</p>
            </div>
            <div className="edit-link">
              <i className="far fa-edit" />
              <p>Edit</p>
            </div>
          </div>
          <div className="line" />
          <div className="setting-section">
            <div>
              <p className="bold">Score Privacy</p>
              <p>Currently only friends can see your scores</p>
            </div>
            <div className="edit-link">
              <i className="far fa-edit" />
              <p>Edit</p>
            </div>
          </div>
          <div className="line" />
          <div className="setting-section">
            <button type="button" className="btn-delete-account">Delete Account</button>
          </div>
        </div>
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
