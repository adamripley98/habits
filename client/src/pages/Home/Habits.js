import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCategory, loadHabits } from '../../redux/actions/categories';
import SideNav from '../../components/SideNav';

class Habits extends Component {
  constructor(props) {
    super(props);
    this.displayTest = this.displayTest.bind(this);
    this.displayHabits = this.displayHabits.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      color: '',
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
      color: color.hex,
    });
  }

  handleSubmit() {
    const { name, color } = this.state;
    this.props.onAddCategory(name, color);
  }

  displayHabits() {
    if (this.props.habits) {
      return Object.keys(this.props.habits).map(category => (
        <p>
          {category}
        </p>
      ));
    }
    return null;
  }

  displayTest() {
    return (
      <div className="container">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          Add category
        </button>
        <h1>Habits</h1>
        {this.displayHabits()}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Add a category</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <h1>Category Name</h1>
                  <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                  <h4>Color</h4>
                  <CirclePicker onChangeComplete={this.handleChangeColor} />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <SideNav component={this.displayTest()} />
    );
  }
}

Habits.propTypes = {
  onAddCategory: PropTypes.func,
  onLoadHabits: PropTypes.func,
  habits: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    habits: state.categoryState.habits,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCategory: (name, color) => dispatch(addCategory(name, color)),
    onLoadHabits: () => dispatch(loadHabits()),
  };
};

// Redux config
Habits = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Habits);

export default Habits;
