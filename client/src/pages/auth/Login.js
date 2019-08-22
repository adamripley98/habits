import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login, clearErrors } from '../../redux/actions/authentication';
import ErrorMessage from '../../components/shared/ErrorMessage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.onClearErrors();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      email, password,
    } = this.state;
    this.props.onLogin(email, password);
  }

  render() {
    return (
      <div className="container">
        {this.props.userId && <Redirect to="/home" />}
        <ErrorMessage error={this.props.error} />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            Email address
            <input value={this.state.email} name="email" onChange={this.handleChange} type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            Password
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/register">
          Register
        </Link>
        <br />
        <Link to="/forgot">
          Forgot Password
        </Link>
        <br />
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  onClearErrors: PropTypes.func,
  userId: PropTypes.string,
  error: PropTypes.string,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
    userId: state.authState.userId,
    error: state.authState.error,
  };
};

// Allows us to dispatch a login event by calling this.props.onLogin
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(login(email, password)),
    onClearErrors: () => dispatch(clearErrors()),
  };
};

// Redux config
Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default Login;
