import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadFriendContent,
} from '../../redux/actions/friends';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // On initial load, load all friend information
  componentDidMount() {
    this.props.onLoadFriendContent();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  showContent() {
    if (this.props.content && this.props.content.length) {
      return (
        <div className="row">
          <div className="col-lg-6">
            {
            this.props.content.map(user => (
              <div className="category-card">
                <div key={user.userId}>
                  <h2 className="underline">{user.name}</h2>
                </div>
                {
                  user.scores.map(category => (
                    <div key={category.categoryId}>
                      <h5 className="underline" style={{ color: category.color }}>{category.name}</h5>
                      <h3>
                        {Math.floor(category.score * 100)}
                        %
                      </h3>
                    </div>
                  ))
                }
              </div>
            ))
            }
          </div>
        </div>
      );
    }
    return null;
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div>
          <h1 className="underline">Feed</h1>
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

Feed.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
  onLoadFriendContent: PropTypes.func,
  content: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    error: state.friendState.error,
    pending: state.friendState.pending,
    content: state.friendState.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFriendContent: () => dispatch(loadFriendContent()),
  };
};

Feed = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default Feed;
