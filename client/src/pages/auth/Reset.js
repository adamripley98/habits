import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { reset, loadReset } from '../../redux/actions/authentication';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // Find the token in the url
    const { token } = this.props.match.params;
    this.props.onLoadReset(token);
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
    this.props.onReset(email);
  }

  render() {
    return (
      <div className="container">
        {this.props.userId && <Redirect to="/" />}
        <h1>Reset Password</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            Password
            <input value={this.state.password} name="email" onChange={this.handleChange} type="password" className="form-control" placeholder="Enter password" />
          </div>
          <div className="form-group">
            Confirm Password
            <input value={this.state.passwordConfirm} name="email" onChange={this.handleChange} type="password" className="form-control" placeholder="Repeat password" />
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

Reset.propTypes = {
  onReset: PropTypes.func,
  onLoadReset: PropTypes.func,
  userId: PropTypes.string,
  match: PropTypes.object,
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
    onReset: (password, passwordConfirm) => dispatch(reset(password, passwordConfirm)),
    onLoadReset: token => dispatch(loadReset(token)),
  };
};

// Redux config
Reset = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reset);

export default Reset;
