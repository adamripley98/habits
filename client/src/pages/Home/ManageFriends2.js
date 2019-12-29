import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadRelationships, addFriend, acceptFriend, rejectFriend,
} from '../../redux/actions/friends';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Adam from '../../images/adampic.jpg';

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
    return (
      <div className="category-card p-3">
        <h3 className="navy-text bold m-3">Friend Requests</h3>
        <div className="line" />
        <div className="user-block">
          <img src={Adam} alt="profile" className="manage-friends-pic" />
          <div className="ml-3">
            <a href="" className="user-link">
              Adam Ripley
            </a>
            <p className="grey-italics mb-0 mt--05">1 mutual friend</p>
          </div>
          <div className="friend-btn-group mr-3">
            <button type="button" className="btn-primary btn-friend-accept mr-1">Confirm</button>
            <button type="button" className="btn-secondary btn-friend-reject">Delete</button>
          </div>
        </div>
        <div className="line" />
        <div className="user-block">
          <img src={Adam} alt="profile" className="manage-friends-pic" />
          <div className="ml-3">
            <a href="" className="user-link">
              Adam Ripley
            </a>
            <p className="grey-italics mb-0 mt--05">6 mutual friends</p>
          </div>
          <div className="friend-btn-group mr-3">
            <button type="button" className="btn-primary btn-friend-accept mr-1">Confirm</button>
            <button type="button" className="btn-secondary btn-friend-reject">Delete</button>
          </div>
        </div>
        <div className="line" />
        <div className="user-block">
          <img src={Adam} alt="profile" className="manage-friends-pic" />
          <div className="ml-3">
            <a href="" className="user-link">
              Adam Ripley
            </a>
            <p className="grey-italics mb-0 mt--05">0 mutual friends</p>
          </div>
          <div className="friend-btn-group mr-3">
            <button type="button" className="btn-primary btn-friend-accept mr-1">Confirm</button>
            <button type="button" className="btn-secondary btn-friend-reject">Delete</button>
          </div>
        </div>
      </div>
    );
  }

  showPending() {
    return (
      <div className="category-card p-3">
        <h3 className="navy-text bold m-3">Pending Approval</h3>
        <div className="line" />
        <div className="user-block">
          <img src={Adam} alt="profile" className="manage-friends-pic" />
          <div className="ml-3">
            <a href="" className="user-link">
              Adam Ripley
            </a>
            <p className="grey-italics mb-0 mt--05">Sent 3 hours ago</p>
          </div>
          <button type="button" className="btn-primary ml-4">Cancel Request</button>
        </div>
        <div className="line" />
        <div className="user-block">
          <img src={Adam} alt="profile" className="manage-friends-pic" />
          <div className="ml-3">
            <a href="" className="user-link">
              Adam Ripley
            </a>
            <p className="grey-italics mb-0 mt--05">Sent 2 days ago</p>
          </div>
          <button type="button" className="btn-primary ml-4">Cancel Request</button>
        </div>
        <div className="line" />
        <div className="user-block">
          <img src={Adam} alt="profile" className="manage-friends-pic" />
          <div className="ml-3">
            <a href="" className="user-link">
              Adam Ripley
            </a>
            <p className="grey-italics mb-0 mt--05">Sent 1 week ago</p>
          </div>
          <button type="button" className="btn-primary ml-4">Cancel Request</button>
        </div>
      </div>
    );
  }

  showAddFriends() {
    return (
      <div className="category-card p-3">
        <h3 className="navy-text bold m-3">Add Friends</h3>
        <p className="grey-italics">Search friends by name or email.</p>
        <div className="line" />
      </div>
    );
  }

  showFriendsList() {
    return (
      <div className="category-card p-3">
        <div className="category-card-header">
          <h3 className="navy-text bold m-3">Friends List</h3>
          <i className="fas fa-ellipsis-h ml-auto mr-4" />
        </div>
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
            {this.showRequested()}
          </div>
          <div className="col-lg-6">
            {this.showPending()}
          </div>
          <div className="col-lg-6">
            {this.showAddFriends()}
          </div>
          <div className="col-lg-6">
            {this.showFriendsList()}
          </div>
        </div>
      </div>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="header-container mb-3">
          <h1 className="header-title">Manage Friends</h1>
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
