import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';
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
    this.displayDate = this.displayDate.bind(this);
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
      arrowClicked: '',
      editting: false,
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
    this.setState({ arrowClicked: 'left' });
    const tempDate = this.props.selectedDate;
    this.props.onLoadHabitDataByDate(moment(tempDate).subtract(1, 'days').format());
  }

  handleClickRight() {
    this.setState({ arrowClicked: 'right' });
    const tempDate = this.props.selectedDate;
    this.props.onLoadHabitDataByDate(moment(tempDate).add(1, 'days').format());
  }

  // Helper method to check or uncheck habit
  handleCheck(e) {
    const habitId = e.target.value;
    const didComplete = e.target.checked;
    const date = this.props.selectedDate;
    // Check/uncheck habit on frontend initially while backend loads
    didComplete ? $(`#${habitId}`).addClass('cross-through') : $(`#${habitId}`).removeClass('cross-through');
    // Check habit in redux and backend
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
        <div className="category-card">
          <div className="category-card-header" style={{ backgroundColor: category.color }}>
            <i className="fas fa-book-open pl-4 float-left" />
            <h4 className="p-3 mb-0">{category.name}</h4>
            {this.state.editting ? <i className="fas fa-trash-alt ml-auto pr-4 habit-icon" /> : null}
          </div>
          <div className="category-card-body">
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
                <div className="individual-habit mb-2" key={habit.habitId}>
                  {
                    this.state.editting ? (
                      <div>
                        <i className="far fa-trash-alt mr-2 habit-icon" />
                        <i className="far fa-edit habit-icon" />
                        <label id={habit.habitId} className="ml-2">{habit.name}</label>
                      </div>
                    ) : (
                      <div className="pretty p-icon p-round p-bigger p-smooth">
                        <input type="checkbox" defaultChecked={habit.didComplete} value={habit.habitId} onClick={this.handleCheck} />
                        <div className="state p-success">
                          <i className="icon gold-text fa fa-check" />
                          <label id={habit.habitId} className={habit.didComplete ? 'test ml-2 cross-through' : 'ml-2'}>{habit.name}</label>
                        </div>
                      </div>
                    )
                  }
                </div>
              ))
            }
            {
              this.state.editting ? (
                <button type="button" className="btn-primary">
                  Add Habit
                </button>
              ) : null
            }
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

  // Helper method to display dates, even before backend has been loaded
  displayDate() {
    if (this.props.pending && this.state.arrowClicked === 'right') {
      return moment(this.props.selectedDate).add(1, 'days').format('dddd, MMMM Do');
    }
    if (this.props.pending && this.state.arrowClicked === 'left') {
      return moment(this.props.selectedDate).subtract(1, 'days').format('dddd, MMMM Do');
    }
    return moment(this.props.selectedDate).format('dddd, MMMM Do');
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="habit-header-container mb-3">
          <h1 className="habit-header-title">Habits</h1>
          <div className="button-group">
            <button type="button" className="btn btn-primary" onClick={() => this.setState({ editting: !this.state.editting })}>
              {this.state.editting ? 'Save Changes' : 'Edit Habits'}
            </button>
          </div>
          <div className="arrow-section">
            <div className="left-arrow">
              <i className="il-block fas fa-angle-left arrow-icon" onClick={this.handleClickLeft} />
            </div>
            <h3 className="il-block date-text navy-text bold">
            &nbsp;&nbsp;
              {this.displayDate()}
            &nbsp;&nbsp;
            </h3>
            <div className="right-arrow">
              <i className="il-block arrow fas fa-angle-right navy-block arrow-icon" onClick={this.handleClickRight} />
            </div>
          </div>
        </div>
        {this.props.pending ? (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        ) : (
          <div className="card-columns">
            {
              this.state.editting ? (
                <div className="category-card navy-background p-2 d-flex align-items-center">
                  <i className="fas fa-plus-circle add-cat-icon mr-2"></i>
                  <h3 className="gold-text mb-0">Add Category</h3>
                </div>
              ) : null
            }
            {this.displayHabits()}
          </div>
        )
        }
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
      <div className="container-fluid">
        <SideNav component={this.displayComponent()} />
      </div>
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
