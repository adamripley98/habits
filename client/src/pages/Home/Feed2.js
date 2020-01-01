import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  showContent() {
    return (
      <div>
        <ErrorMessage error={this.props.error} />
        <div className="row">
          <div className="col-lg-7">
            <div className="category-card">
              <div className="category-card-header">
                <h3 className="card-title">New Post</h3>
              </div>
              <div className="category-card-body">
                <textarea className="form-control status-input" rows="3" placeholder="What's on your mind?" />
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn-primary mt-2">Post</button>
                </div>
              </div>
            </div>
            <div className="category-card">
              <div className="category-card-header">
                <h3 className="card-title">New Post</h3>
              </div>
              <div className="category-card-body">
                hello
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="category-card">
              <div className="category-card-header">
                <h3 className="card-title">Friend Scores</h3>
              </div>
              <div className="category-card-body">
                hello
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="header-container mb-3">
          <h1 className="header-title">Feed</h1>
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

Feed.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    error: state.friendState.error,
    pending: state.friendState.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

Feed = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default Feed;
