import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Moves from './Moves';
import StopWatch from './StopWatch';

class GameStats extends Component {
  static propTypes = {
    moves: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  };

  render() {
    const { className, moves, seconds } = this.props;

    return (
      <div className={className}>
        <Moves moves={moves} />
        <StopWatch seconds={seconds} />
      </div>
    );
  }
}

export default styled(GameStats)`
    text-align:center;
    margin: 10px;
`;
