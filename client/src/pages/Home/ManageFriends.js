import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadRelationships, addFriend, acceptFriend, rejectFriend,
} from '../../redux/actions/friends';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';

class ManageFriends extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleAcceptFriend = this.handleAcceptFriend.bind(this);
    this.handleRejectFriend = this.handleRejectFriend.bind(this);
    this.state = {
      friendEmail: '',
    };
  }

  // On initial load, load all relationships
  componentDidMount() {
    this.props.onLoadRelationships();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleAddFriend() {
    this.props.onAddFriend(this.state.friendEmail);
  }

  handleAcceptFriend(userId) {
    this.props.onAcceptFriend(userId);
  }

  handleRejectFriend(userId) {
    this.props.onRejectFriend(userId);
  }

  showRequested() {
    return this.props.relationships.map(r => r.status === 'requested' ? (
      <div>
        <h5 className="il-block">{r.name}</h5>
        &nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-primary btn-smaller" onClick={() => this.handleAcceptFriend(r.userId)}>Accept</button>
        <button type="button" className="btn btn-secondary btn-smaller" onClick={() => this.handleRejectFriend(r.userId)}>Decline</button>
      </div>
    ) : null);
  }

  showPending() {
    return this.props.relationships.map(r => r.status === 'pending' ? (
      <h5>{r.name}</h5>
    ) : null);
  }

  showContent() {
    return (
      <div>
        <ErrorMessage error={this.props.error} />
        <div className="category-card">
          <p>Enter a friend&apos;s email to add them.</p>
          <input type="text" name="friendEmail" onChange={this.handleChange} value={this.state.friendEmail} />
          <button type="button" className="btn btn-primary" onClick={this.handleAddFriend}>Add Friend</button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="category-card">
              <h3 className="underline">Friend requests</h3>
              {this.showRequested()}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="category-card">
              <h3 className="underline">Pending approval</h3>
              {this.showPending()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div>
          <h1 className="underline">Add friends</h1>
        </div>
        {this.props.pending ? <Loading /> : this.showContent()}
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

ManageFriends.propTypes = {
  onLoadRelationships: PropTypes.func,
  onAddFriend: PropTypes.func,
  onAcceptFriend: PropTypes.func,
  onRejectFriend: PropTypes.func,
  error: PropTypes.string,
  pending: PropTypes.bool,
  relationships: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    error: state.friendState.error,
    pending: state.friendState.pending,
    relationships: state.friendState.relationships,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadRelationships: () => dispatch(loadRelationships()),
    onAddFriend: friendEmail => dispatch(addFriend(friendEmail)),
    onAcceptFriend: userId => dispatch(acceptFriend(userId)),
    onRejectFriend: userId => dispatch(rejectFriend(userId)),
  };
};

ManageFriends = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageFriends);

export default ManageFriends;
