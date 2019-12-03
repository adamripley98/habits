import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadRelationships, addFriend,
} from '../../redux/actions/friends';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';

class AddFriends extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
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

  displayComponent() {
    return (
      <div className="container">
        <div className="habit-header-container">
          <h1 className="underline">Add friends</h1>
          <div>
            <h3 className="il-block">
            &nbsp;&nbsp;
              yo there
            &nbsp;&nbsp;
            </h3>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-primary btn-add" data-toggle="modal" data-target="#categoryModal">
              Add category
            </button>
            <button type="button" className="btn btn-primary btn-add" data-toggle="modal" data-target="#habitModal">
              Add habit
            </button>
          </div>
        </div>
        <div className="category-card">
          <ErrorMessage error={this.props.error} />
          <p>Enter a friend&apos;s email to add them.</p>
          <input type="text" name="friendEmail" onChange={this.handleChange} value={this.state.friendEmail} />
          <button type="button" className="btn btn-primary" onClick={this.handleAddFriend}>Add Friend</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <SideNav component={this.displayComponent()} />
    );
  }
}

AddFriends.propTypes = {
  onLoadRelationships: PropTypes.func,
  onAddFriend: PropTypes.func,
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
    onLoadRelationships: () => dispatch(loadRelationships()),
    onAddFriend: friendEmail => dispatch(addFriend(friendEmail)),
  };
};

AddFriends = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFriends);

export default AddFriends;
