import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import {
  loadScores,
} from '../../redux/actions/scores';

class Home extends Component {
  constructor(props) {
    super(props);
    this.displayComponent = this.displayComponent.bind(this);
    this.displayScores = this.displayScores.bind(this);
    this.clickDay = this.clickDay.bind(this);
    this.clickWeek = this.clickWeek.bind(this);
    this.clickMonth = this.clickMonth.bind(this);
    this.getTotalScore = this.getTotalScore.bind(this);
    this.state = {
      active: 'day',
    };
  }

  componentDidMount() {
    this.props.onLoadScores('day');
  }

  clickDay() {
    this.setState({
      active: 'day',
    });
    this.props.onLoadScores('day');
  }

  clickWeek() {
    this.setState({
      active: 'week',
    });
    this.props.onLoadScores('week');
  }

  clickMonth() {
    this.setState({
      active: 'month',
    });
    this.props.onLoadScores('month');
  }

  // Helper to get total optimization score
  getTotalScore() {
    if (this.props.scores && this.props.scores.length) {
      const nums = [];
      this.props.scores.forEach((cat) => { nums.push(cat.score); });
      return Math.floor((nums.reduce((a, b) => a + b, 0) / nums.length) * 100);
    }
    return 0;
  }

  displayScores() {
    if (this.props.scores && this.props.scores.length) {
      // Sort alphabetically by category name
      const sortedCategories = this.props.scores.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      return (
        <div className="row">
          <div className="col-lg-6">
            <div className="category-card">
              {
                sortedCategories.map(category => (
                  <div key={category.categoryId}>
                    <h3 className="underline" style={{ color: category.color }}>{category.name}</h3>
                    <h3>
                      {Math.floor(category.score * 100)}
                      %
                    </h3>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-lg-6">
            <div className="category-card">
              <h3 className="underline">Total Optimization</h3>
              <h1>
                {this.getTotalScore()}
              %
              </h1>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="header-container">
          <h1 className="underline">Home</h1>
          <div>
            <h3 className={this.state.active === 'day' ? 'duration-option clicked' : 'duration-option'} onClick={this.clickDay}>Day</h3>
            <h3 className={this.state.active === 'week' ? 'duration-option clicked' : 'duration-option'} onClick={this.clickWeek}>Week</h3>
            <h3 className={this.state.active === 'month' ? 'duration-option clicked' : 'duration-option'} onClick={this.clickMonth}>Month</h3>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-primary">
              Enter Today&apos;s Habits
            </button>
          </div>
        </div>
        <div>
          {this.props.pending ? <Loading /> : this.displayScores()}
        </div>
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

Home.propTypes = {
  onLoadScores: PropTypes.func,
  pending: PropTypes.bool,
  scores: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    pending: state.scoreState.pending,
    scores: state.scoreState.scores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadScores: period => dispatch(loadScores(period)),
  };
};

Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Home;
