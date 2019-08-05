import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authentication';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name, email, password, repeatPassword,
    } = this.state;
    this.props.onRegister(name, email, password, repeatPassword);
  }

  render() {
    return (
      <div className="container">
        <h1>Project Home</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            Full name
            <input value={this.state.name} name="name" onChange={this.handleChange} type="text" className="form-control" placeholder="Enter name" />
          </div>
          <div className="form-group">
            Email address
            <input value={this.state.email} name="email" onChange={this.handleChange} type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            Password
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="form-group">
            Confirm password
            <input value={this.state.repeatPassword} name="repeatPassword" onChange={this.handleChange} type="password" className="form-control" placeholder="Confirm password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  onRegister: PropTypes.func,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
  };
};

// Allows us to dispatch a login event by calling this.props.onLogin
const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (name, email, password, repeatPassword) => dispatch(register(name, email, password, repeatPassword)),
  };
};

// Redux config
SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUp;
