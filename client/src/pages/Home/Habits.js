import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  addCategory, addHabit, checkHabit, loadHabitDataByDate,
} from '../../redux/actions/habits';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';

class Habits extends Component {
  constructor(props) {
    super(props);
    this.displayComponent = this.displayComponent.bind(this);
    this.displayHabits = this.displayHabits.bind(this);
    this.displaySelect = this.displaySelect.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAddCategory = this.handleSubmitAddCategory.bind(this);
    this.handleSubmitAddHabit = this.handleSubmitAddHabit.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      categoryName: '',
      categoryColor: '',
      habitName: '',
      habitCategory: '',
    };
  }

  // Initially load all habits from the backend
  componentDidMount() {
    this.props.onLoadHabitDataByDate(moment(new Date()).format());
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleChangeColor(color) {
    this.setState({
      categoryColor: color.hex,
    });
  }

  handleSubmitAddCategory() {
    const { categoryName, categoryColor } = this.state;
    this.props.onAddCategory(categoryName, categoryColor);
  }

  handleSubmitAddHabit() {
    const { habitName, habitCategory } = this.state;
    this.props.onAddHabit(habitName, habitCategory);
  }

  handleClickLeft() {
    const tempDate = this.props.selectedDate;
    this.props.onLoadHabitDataByDate(moment(tempDate).subtract(1, 'days').format());
  }

  handleClickRight() {
    const tempDate = this.props.selectedDate;
    this.props.onLoadHabitDataByDate(moment(tempDate).add(1, 'days').format());
  }

  // Helper method to check or uncheck habit
  handleCheck(e) {
    const habitId = e.target.value;
    const didComplete = e.target.checked;
    const date = this.props.selectedDate;
    this.props.onCheckHabit(habitId, didComplete, date);
  }

  displayHabits() {
    if (this.props.habits && this.props.habits.length) {
      // Sort alphabetically by category name
      const sortedCategories = this.props.habits.sort((a, b) => {
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

      return sortedCategories.map(category => (
        <div className="col-lg-6" key={category.categoryId}>
          <div className="category-card">
            <h4 className="underline" style={{ color: category.color }}>{category.name}</h4>
            <ul>
              {
                category.habits.sort((a, b) => {
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
                }).map(habit => (
                  <div className="individual-habit" key={habit.habitId}>
                    <input type="checkbox" name="habit-check" value={habit.habitId} onClick={this.handleCheck} defaultChecked={habit.didComplete} />
                    <ul className="habit-text">{habit.name}</ul>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
      ));
    }
    return null;
  }

  displaySelect() {
    if (this.props.habits) {
      return (
        <select id="inputCategory" className="form-control" name="habitCategory" defaultValue="choose" onChange={this.handleChange}>
          <option value="choose" disabled>Choose...</option>
          {
            this.props.habits.map(cat => (
              <option value={cat.name} key={cat.categoryId}>{cat.name}</option>
            ))
          }
        </select>
      );
    }
    return (
      <p>
        You must first create a category.
      </p>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6 push-right">
        <div className="header-container">
          <h1 className="underline">Habits</h1>
          <div>
            <i className="il-block fas fa-angle-left" onClick={this.handleClickLeft} />
            <h3 className="il-block">
            &nbsp;&nbsp;
              {moment(this.props.selectedDate).format('dddd, MMMM Do')}
            &nbsp;&nbsp;
            </h3>
            <i className="il-block fas fa-angle-right" onClick={this.handleClickRight} />
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
        <div className="row justify-content-center">
          {this.props.pending ? <Loading /> : this.displayHabits()}
        </div>
        <div className="modal fade" id="categoryModal" tabIndex="-1" role="dialog" aria-labelledby="categoryModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="categoryModalTitle">Add a category</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <h1>Category Name</h1>
                  <input type="text" name="categoryName" onChange={this.handleChange} value={this.state.categoryName} />
                  <h4>Color</h4>
                  <CirclePicker onChangeComplete={this.handleChangeColor} />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmitAddCategory}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="habitModal" tabIndex="-1" role="dialog" aria-labelledby="habitModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="habitModalTitle">Add a habit</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <h1>Habit Name</h1>
                  <input type="text" name="habitName" onChange={this.handleChange} value={this.state.habitName} />
                  <h4>Category</h4>
                  {this.displaySelect()}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmitAddHabit}>Save changes</button>
              </div>
            </div>
          </div>
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

Habits.propTypes = {
  onAddCategory: PropTypes.func,
  onAddHabit: PropTypes.func,
  onCheckHabit: PropTypes.func,
  onLoadHabitDataByDate: PropTypes.func,
  habits: PropTypes.array,
  selectedDate: PropTypes.string,
  pending: PropTypes.bool,
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
    onAddCategory: (name, color) => dispatch(addCategory(name, color)),
    onAddHabit: (name, categoryName) => dispatch(addHabit(name, categoryName)),
    onLoadHabitDataByDate: date => dispatch(loadHabitDataByDate(date)),
    onCheckHabit: (habitId, didComplete, date) => dispatch(checkHabit(habitId, didComplete, date)),
  };
};

Habits = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Habits);

export default Habits;
