import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCategory, loadHabits, addHabit } from '../../redux/actions/habits';
import SideNav from '../../components/SideNav';

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
    this.state = {
      categoryName: '',
      categoryColor: '',
      habitName: '',
    };
  }

  // Initially load all habits from the backend
  componentDidMount() {
    this.props.onLoadHabits();
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
    const { habitName } = this.state;
    // TODO get categoryName
    this.props.onAddHabit(habitName);
  }

  displayHabits() {
    if (this.props.habits) {
      return Object.keys(this.props.habits).map(category => (
        <div>
          <span className="circle" />
          <h3>{category}</h3>
        </div>
      ));
    }
    return null;
  }

  displaySelect() {
    if (this.props.habits) {
      return (
        <select id="inputCategory" className="form-control">
          <option selected disabled>Choose...</option>
          {
            Object.keys(this.props.habits).map(cat => (
              <option value={cat} key={cat}>{cat}</option>
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
      <div className="container">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#categoryModal">
          Add category
        </button>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#habitModal">
          Add habit
        </button>
        <button type="button" className="btn btn-secondary" onClick={this.handleEdit}>
          Edit
        </button>
        <h1>Habits</h1>
        {this.displayHabits()}
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
  onLoadHabits: PropTypes.func,
  habits: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    habits: state.habitState.habits,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCategory: (name, color) => dispatch(addCategory(name, color)),
    onAddHabit: (name, categoryName) => dispatch(addHabit(name, categoryName)),
    onLoadHabits: () => dispatch(loadHabits()),
  };
};

Habits = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Habits);

export default Habits;
