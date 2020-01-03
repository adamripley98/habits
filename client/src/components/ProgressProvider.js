import React from 'react';
import PropTypes from 'prop-types';

class ProgressProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.valueStart,
      color: this.pickColor(this.props.valueEnd),
    };
    this.timeout = undefined;
  }

  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({
        value: this.props.valueEnd,
      });
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.valueEnd !== this.props.valueEnd) {
      this.setState({
        value: this.props.valueEnd,
      });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  // Helper method to change color of progress bar dependent on value
  pickColor(value) {
    // eslint-disable-next-line no-restricted-globals
    if (!value || isNaN(value) || value > 100 || value < 0) {
      return '#ededed';
    }
    if (value < 25) {
      return '#FF3D00';
    }
    if (value < 50) {
      return '#FFD600';
    }
    if (value < 75) {
      return '#c8ed50';
    }
    return '#64DD17';
  }

  render() {
    return this.props.children(this.state.value, this.state.color);
  }
}

ProgressProvider.propTypes = {
  valueEnd: PropTypes.number,
  valueStart: PropTypes.number,
  children: PropTypes.object,
};

export default ProgressProvider;
