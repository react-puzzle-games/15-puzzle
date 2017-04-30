import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Moves from './Moves';
import StopWatch from './StopWatch';
import { GAME_OVER } from '../lib/game-status';

class GameStats extends Component {
  static propTypes = {
    moves: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    gameState: PropTypes.symbol.isRequired,
  };

  render() {
    const { className, moves, seconds } = this.props;

    return (
      <div className={className}>
        <Moves moves={moves} />
        <StopWatch seconds={seconds} />
        {this._renderStateMessage()}
      </div>
    );
  }

  _renderStateMessage() {
    if (this.props.gameState === GAME_OVER) {
      return <div className="gameStateMessage">Congrats!</div>;
    } else {
      return null;
    }
  }
}

export default styled(GameStats)`
  text-align: center;
  margin: 10px;

  & div.gameStateMessage {
    color: #fff;
    background-color: #226666;
    padding: 20px;
    margin-top: 10px;
  }
`;
