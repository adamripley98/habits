import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SideNav from '../../components/SideNav';
import ProgressProvider from '../../components/ProgressProvider';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Adam from '../../images/adampic.jpg';

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

  showNewPost() {
    return (
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="card-title">New Post</h3>
        </div>
        <div className="category-card-body">
          <textarea className="form-control" rows="3" placeholder="What's on your mind?" />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn-primary mt-2">Post</button>
          </div>
        </div>
      </div>
    );
  }

  showPosts() {
    return (
      <div>
        <div className="category-card">
          <div className="category-card-body">
            <div className="post-container">
              <div className="post-header">
                <img src={Adam} alt="profile" className="friends-pic mt-1" />
                <div className="">
                  <a href="" className="user-link">
                    Adam Ripley
                  </a>
                  <p className="grey-italics">1/2/20 at 4:32 PM</p>
                </div>
                <i className="fas fa-ellipsis-h ml-auto mr-4 mt-3" />
              </div>
              <div className="line" />
              <div className="post-body">
                tronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
              </div>
              <div className="line" />
              <div className="post-footer">
                <div className="comment-box-container">
                  <input type="text" className="comment-box" placeholder="Add a comment" />
                </div>
                <div className="icons-box">
                  <div className="pretty p-icon p-toggle p-jelly p-plain like-icon">
                    <input type="checkbox" />
                    <div className="state p-off">
                      <i className="icon fa fa-heart-o " />
                      <label>3 likes</label>
                    </div>
                    <div className="state p-on p-danger-o">
                      <i className="icon fa fa-heart" />
                      <label>4 likes</label>
                    </div>
                  </div>
                  <div className="comment-icon">
                    <i className="far fa-comment light-grey" />
                    <label>&nbsp;0 comments</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category-card">
          <div className="category-card-body">
            <div className="post-container">
              <div className="post-header">
                <img src={Adam} alt="profile" className="friends-pic mt-1" />
                <div className="">
                  <a href="" className="user-link">
                    Adam Ripley
                  </a>
                  <p className="grey-italics">1/2/20 at 4:32 PM</p>
                </div>
                <i className="fas fa-ellipsis-h ml-auto mr-4 mt-3" />
              </div>
              <div className="line" />
              <div className="post-body">
                he release of Letraset sheets containing Lorem Ipsum passages, and more recently with?
              </div>
              <div className="line" />
              <div className="post-footer">
                <div className="comment-box-container">
                  <input type="text" className="comment-box" placeholder="Add a comment" />
                </div>
                <div className="icons-box">
                  <div className="pretty p-icon p-toggle p-jelly p-plain like-icon">
                    <input type="checkbox" />
                    <div className="state p-off">
                      <i className="icon fa fa-heart-o " />
                      <label>3 likes</label>
                    </div>
                    <div className="state p-on p-danger-o">
                      <i className="icon fa fa-heart" />
                      <label>4 likes</label>
                    </div>
                  </div>
                  <div className="comment-icon">
                    <i className="far fa-comment light-grey" />
                    <label>&nbsp;0 comments</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category-card">
          <div className="category-card-body">
            <div className="post-container">
              <div className="post-header">
                <img src={Adam} alt="profile" className="friends-pic mt-1" />
                <div className="">
                  <a href="" className="user-link">
                    Adam Ripley
                  </a>
                  <p className="grey-italics">1/2/20 at 4:32 PM</p>
                </div>
                <i className="fas fa-ellipsis-h ml-auto mr-4 mt-3" />
              </div>
              <div className="line" />
              <div className="post-body">
                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
              </div>
              <div className="line" />
              <div className="post-footer">
                <div className="comment-box-container">
                  <input type="text" className="comment-box" placeholder="Add a comment" />
                </div>
                <div className="icons-box">
                  <div className="pretty p-icon p-toggle p-jelly p-plain like-icon">
                    <input type="checkbox" />
                    <div className="state p-off">
                      <i className="icon fa fa-heart-o " />
                      <label>3 likes</label>
                    </div>
                    <div className="state p-on p-danger-o">
                      <i className="icon fa fa-heart" />
                      <label>4 likes</label>
                    </div>
                  </div>
                  <div className="comment-icon">
                    <i className="far fa-comment light-grey" />
                    <label>&nbsp;0 comments</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn-primary">Show More</button>
        </div>
      </div>
    );
  }

  showScores() {
    return (
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="card-title">Friend Scores</h3>
        </div>
        <div className="category-card-body">
          <div className="user-block pt-2 pb-2">
            <ProgressProvider valueStart={0} valueEnd={86}>
              {(value, color) => (
                <CircularProgressbarWithChildren
                  value={value}
                  initialAnimation
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    pathTransitionDuration: 1,
                    pathColor: `${color}`,
                    trailColor: '#ededed',
                  })}
                >
                  <img className="circle-pic" src={Adam} alt="Adam" />
                </CircularProgressbarWithChildren>
              )
             }
            </ProgressProvider>
            <div className="ml-3">
              <a href="" className="link-large navy-link">
                Adam Ripley
              </a>
              <p className="grey-italics p-bigger">86% optimized</p>
            </div>
            <div className="show-more-div">
              <div className="link-small bold">
                Show More
                <i className="icon fa fa-chevron-right ml-1 arrow-move-right" />
              </div>
            </div>
          </div>
          <div className="line" />
          <div className="user-block pt-2 pb-2">
            <ProgressProvider valueStart={0} valueEnd={71}>
              {(value, color) => (
                <CircularProgressbarWithChildren
                  value={value}
                  initialAnimation
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    pathTransitionDuration: 1,
                    pathColor: `${color}`,
                    trailColor: '#ededed',
                  })}
                >
                  <img className="circle-pic" src={Adam} alt="Adam" />
                </CircularProgressbarWithChildren>
              )
             }
            </ProgressProvider>
            <div className="ml-3">
              <a href="" className="link-large navy-link">
                Adam Ripley
              </a>
              <p className="grey-italics p-bigger">71% optimized</p>
            </div>
            <div className="show-more-div">
              <div className="link-small bold">
                Show More
                <i className="icon fa fa-chevron-right ml-1 arrow-move-right" />
              </div>
            </div>
          </div>
          <div className="line" />
          <div className="user-block pt-2 pb-2">
            <ProgressProvider valueStart={0} valueEnd={45}>
              {(value, color) => (
                <CircularProgressbarWithChildren
                  value={value}
                  initialAnimation
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    pathTransitionDuration: 1,
                    pathColor: `${color}`,
                    trailColor: '#ededed',
                  })}
                >
                  <img className="circle-pic" src={Adam} alt="Adam" />
                </CircularProgressbarWithChildren>
              )
             }
            </ProgressProvider>
            <div className="ml-3">
              <a href="" className="link-large navy-link">
                Adam Ripley
              </a>
              <p className="grey-italics p-bigger">45% optimized</p>
            </div>
            <div className="show-more-div">
              <div className="link-small bold">
                Show More
                <i className="icon fa fa-chevron-right ml-1 arrow-move-right" />
              </div>
            </div>
          </div>
          <div className="line" />
          <div className="user-block pt-2 pb-2">
            <ProgressProvider valueStart={0} valueEnd={18}>
              {(value, color) => (
                <CircularProgressbarWithChildren
                  value={value}
                  initialAnimation
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    pathTransitionDuration: 1,
                    pathColor: `${color}`,
                    trailColor: '#ededed',
                  })}
                >
                  <img className="circle-pic" src={Adam} alt="Adam" />
                </CircularProgressbarWithChildren>
              )
             }
            </ProgressProvider>
            <div className="ml-3">
              <a href="" className="link-large navy-link">
                Adam Ripley
              </a>
              <p className="grey-italics p-bigger">18% optimized</p>
            </div>
            <div className="show-more-div">
              <div className="link-small bold">
                Show More
                <i className="icon fa fa-chevron-right ml-1 arrow-move-right" />
              </div>
            </div>
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
          <div className="col-lg-7">
            { this.showNewPost() }
            { this.showPosts() }
          </div>
          <div className="col-lg-5">
            { this.showScores() }
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
