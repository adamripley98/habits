import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import SideNav from '../../components/SideNav';
import ProgressProvider from '../../components/ProgressProvider';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Adam from '../../images/adampic.jpg';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      showReadMore: false,
      sortedBy: 'Score (High to Low)',
      duration: 'Week',
    };
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
          <textarea className="form-control status-input" rows="3" placeholder="What's on your mind?" />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn-primary mt-2">Post</button>
          </div>
        </div>
      </div>
    );
  }

  // Helper to display only parts of long posts
  showPostBody(isClicked) {
    // TODO pass in actual text from backend and isClicked
    const txt = "is simply dummy text of the printing and typesetting industry. Lorem I psum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic t";
    // truncate text if too long
    if (txt.length > 700) {
      return (
        <div>
          { this.state.showReadMore ? (
            <p className="mb-0">
              {txt}
            </p>
          ) : (
            <p className="mb-0">
              {`${txt.substring(0, 700)}...`}
            </p>
          )}
          <div className="show-more-div pt-0 mr-0 float-right" onClick={() => this.setState({ showReadMore: !this.state.showReadMore })}>
            <div className="link-small bold">
              { this.state.showReadMore ? (
                <div>
                  <span>Read Less</span>
                  <i className="icon fa fa-chevron-up ml-1" />
                </div>
              ) : (
                <div>
                  <span>Read More</span>
                  <i className="icon fa fa-chevron-right ml-1 arrow-move-right" />
                </div>
              )}
            </div>
          </div>
          <div className="clear-float" />
        </div>
      );
    }
    // if not, return all text
    return (
      <p>
        {txt}
      </p>
    );
  }

  showComments() {
    return (
      <div className="comment-section">
        <div className="line" />
        <div className="comment-block">
          <div className="comment-header">
            <img src={Adam} alt="profile" />
            <div>
              <a href="" className="user-link">
                Adam Ripley
              </a>
              <p className="grey-italics">1/2/20 at 4:32 PM</p>
            </div>
            <i className="fa fa-caret-right navy-text" />
          </div>
          <div className="comment-body">
            <p className="p-smaller">I think this is a really cool post thanks for sharing. I think this is a really cool post thanks for sharing</p>
          </div>
        </div>
        <div className="comment-block">
          <div className="comment-header">
            <img src={Adam} alt="profile" />
            <div>
              <a href="" className="user-link">
                Adam Ripley
              </a>
              <p className="grey-italics">1/2/20 at 4:32 PM</p>
            </div>
            <i className="fa fa-caret-right navy-text" />
          </div>
          <div className="comment-body">
            <p className="p-smaller">I think this is a really cool post thanks for sharing. I think this is a really cool post thanks for sharing</p>
          </div>
        </div>
        <div className="comment-block">
          <div className="comment-header">
            <img src={Adam} alt="profile" />
            <div>
              <a href="" className="user-link">
                Adam Ripley
              </a>
              <p className="grey-italics">1/2/20 at 4:32 PM</p>
            </div>
            <i className="fa fa-caret-right navy-text" />
          </div>
          <div className="comment-body">
            <p className="p-smaller">I think this is a really cool post thanks for sharing. I think this is a really cool post thanks for sharing</p>
          </div>
        </div>
        <div className="comment-block">
          <div className="comment-header">
            <img src={Adam} alt="profile" />
            <div>
              <a href="" className="user-link">
                Adam Ripley
              </a>
              <p className="grey-italics">1/2/20 at 4:32 PM</p>
            </div>
            <i className="fa fa-caret-right navy-text" />
          </div>
          <div className="comment-body">
            <p className="p-smaller">I think this is a really cool post thanks for sharing. I think this is a really cool post thanks for sharing</p>
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
                <div>
                  <a href="" className="user-link">
                    Adam Ripley
                  </a>
                  <p className="grey-italics">1/2/20 at 4:32 PM</p>
                </div>
                <i className="fas fa-ellipsis-h ml-auto mr-4 mt-3" />
              </div>
              <div className="line" />
              <div className="post-body mb-0">
                tronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
              </div>
              {this.state.showComments ? this.showComments() : null}
              <div className="line" />
              <div className="post-footer">
                <input type="text" className="comment-box" style={{ width: '100%' }} placeholder="Add a comment" />
                <div className="icons-box">
                  <div className="pretty p-icon p-toggle p-jelly p-plain like-icon">
                    <input type="checkbox" />
                    <div className="state p-off">
                      <i className="icon fa fa-heart-o " />
                      <label>3 likes</label>
                    </div>
                    <div className="state p-on p-danger-o">
                      <i className="icon fa fa-heart-o" />
                      <label>4 likes</label>
                    </div>
                  </div>
                  <div className="comment-icon" onClick={() => this.setState({ showComments: !this.state.showComments })}>
                    <i className={this.state.showComments ? 'far fa-comment navy-text' : 'far fa-comment light-grey'} />
                    <label className="mb-0">&nbsp;4 comments</label>
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
                {this.showPostBody()}
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
          <button type="button" className="btn-primary">Load More</button>
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
        <div className="sort-section">
          <div>
            <p className="bold navy-text m-0">Sorting by:</p>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn dropdown-toggle" type="button" id="sort-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.sortedBy}
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sort-dropdown">
              <a className="dropdown-item" href="#">Score (High to Low)</a>
              <a className="dropdown-item" href="#">Score (Low to High)</a>
              <a className="dropdown-item" href="#">Alphabetical</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn dropdown-toggle" type="button" id="duration-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.duration}
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="duration-dropdown">
              <a className="dropdown-item" href="#">Day</a>
              <a className="dropdown-item" href="#">Week</a>
              <a className="dropdown-item" href="#">Month</a>
            </div>
          </div>
        </div>
        <div className="category-card-body scores-card">
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
        <div className="row d-flex">
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
