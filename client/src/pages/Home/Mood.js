import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';

class Mood extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  showCreateNew() {
    return (
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="card-title">Create New Entry</h3>
          <i className="far fa-edit" />
        </div>
        <div className="category-card-body">
          <h1>hello world</h1>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn-primary mr-4">Post</button>
          </div>
        </div>
      </div>
    );
  }

  showPastEntries() {
    return (
      <div className="category-card past-entries">
        <div className="category-card-header">
          <h3 className="card-title">Past Entries</h3>
        </div>
        <div className="category-card-body scroll">
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
        </div>
      </div>
    );
  }

  showContent() {
    return (
      <div>
        <ErrorMessage error={this.props.error} />
        { this.showCreateNew()}
        { this.showPastEntries() }
      </div>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="header-container mb-3">
          <h1 className="header-title">Track Mood</h1>
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

Mood.propTypes = {
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

Mood = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mood);

export default Mood;
