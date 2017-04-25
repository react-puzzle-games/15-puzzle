import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

class StopWatch extends Component {
  static propTypes = {
    seconds: PropTypes.number.isRequired,
  };

  render() {
    const { className, seconds } = this.props;

    return (
      <div className={className}>
        Time elapsed: {seconds}s
      </div>
    );
  }
}

export default styled(StopWatch)`
        margin: 5px;
`;
