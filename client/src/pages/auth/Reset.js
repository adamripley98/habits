import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { reset, loadReset, clearErrors } from '../../redux/actions/authentication';
import ErrorMessage from '../../components/shared/ErrorMessage';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      token: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    this.setState({ token });
    this.props.onLoadReset(token);
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
      password,
      passwordConfirm,
      token,
    } = this.state;
    this.props.onReset(password, passwordConfirm, token);
  }

  render() {
    return (
      <div className="container">
        {this.props.userId && <Redirect to="/" />}
        <ErrorMessage error={this.props.error} />
        <h1>Reset Password</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            Password
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" className="form-control" placeholder="Enter password" />
          </div>
          <div className="form-group">
            Confirm Password
            <input value={this.state.passwordConfirm} name="passwordConfirm" onChange={this.handleChange} type="password" className="form-control" placeholder="Repeat password" />
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
  onClearErrors: PropTypes.func,
  userId: PropTypes.string,
  match: PropTypes.object,
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
    onReset: (password, passwordConfirm, token) => dispatch(reset(password, passwordConfirm, token)),
    onClearErrors: () => dispatch(clearErrors()),
    onLoadReset: token => dispatch(loadReset(token)),
  };
};

// Redux config
Reset = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reset);

export default Reset;
