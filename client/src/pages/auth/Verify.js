// Import frameworks
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';
import { verify } from '../../redux/actions/authentication';


/**
 * Component rendered to tell user that they've been verified
 */
class Verify extends Component {
  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.onVerify(token);
  }

  render() {
    return (
      <div className="container">
        <h2>
          Verification
        </h2>
        {
          this.props.verified ? (
            <p>Your account has been verified</p>
          ) : (
            <ErrorMessage error={this.props.error} />
          )
        }
      </div>
    );
  }
}

Verify.propTypes = {
  match: PropTypes.object,
  onVerify: PropTypes.func,
  error: PropTypes.string,
  verified: PropTypes.bool,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
    error: state.authState.error,
    verified: state.authState.verified,
  };
};

// Allows us to dispatch a login event by calling this.props.onLogin
const mapDispatchToProps = (dispatch) => {
  return {
    onVerify: verificationToken => dispatch(verify(verificationToken)),
  };
};

// Redux config
Verify = connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify);

export default Verify;
