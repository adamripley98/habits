import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { forgot } from '../../redux/actions/authentication';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
      email,
    } = this.state;
    this.props.onForgot(email);
  }

  render() {
    return (
      <div className="container">
        {this.props.userId && <Redirect to="/" />}
        <h1>Forgot Password</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            Email address
            <input value={this.state.email} name="email" onChange={this.handleChange} type="email" className="form-control" placeholder="Enter email" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/login">
          Login
        </Link>
      </div>
    );
  }
}

Forgot.propTypes = {
  onForgot: PropTypes.func,
  userId: PropTypes.string,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
    userId: state.authState.userId,
  };
};

// Allows us to dispatch a login event by calling this.props.onLogin
const mapDispatchToProps = (dispatch) => {
  return {
    onForgot: email => dispatch(forgot(email)),
  };
};

// Redux config
Forgot = connect(
  mapStateToProps,
  mapDispatchToProps
)(Forgot);

export default Forgot;
