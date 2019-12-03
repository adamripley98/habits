import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideNav from '../../components/SideNav';
import {
  loadScores,
} from '../../redux/actions/scores';

class Home extends Component {
  constructor(props) {
    super(props);
    this.displayComponent = this.displayComponent.bind(this);
  }

  componentDidMount() {
    this.props.onLoadScores('day');
  }

  displayComponent() {
    return (
      <div className="container">
        <div className="habit-header-container">
          <h1 className="underline">Home</h1>
          <div>
            <h3 className="duration-option clicked">Day</h3>
            <h3 className="duration-option">Week</h3>
            <h3 className="duration-option">Month</h3>
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-primary btn-add">
              Enter Today&apos;s Habits
            </button>
          </div>
        </div>
        <div>
          <h2>Categories</h2>
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

Home.propTypes = {
  onLoadScores: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    habits: state.habitState.habits,
    selectedDate: state.habitState.selectedDate,
    pending: state.habitState.pending,
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
