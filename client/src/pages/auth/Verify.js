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
  constructor(props) {
    super(props);
    this.state = {
      verified: false,
      error: '',
      pending: true,
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.onVerify(token);
  }

  render() {
    return (
      <div className="card pad-1 marg-top-1">
        <h2>
          Verification
        </h2>
        {
          this.state.pending ? <Loading /> : (
            <div>
              { this.state.verified ? (
                <div className="alert alert-success marg-bot-1">
                  Your account has been verified!
                </div>
              ) : null }
              <ErrorMessage error={this.state.error} />
              <Link to="/" className="btn btn-primary full-width">
                Back to home
              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

Verify.propTypes = {
  match: PropTypes.object,
  onVerify: PropTypes.func,
};

// Allows us to access redux state as this.props.userId inside component
const mapStateToProps = (state) => {
  return {
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
