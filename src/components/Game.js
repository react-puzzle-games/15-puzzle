import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import { getTileCoords, distanceBetween, invert } from '../lib/utils';
import Grid from './Grid';
import GameStats from './GameStats';

class Game extends Component {
  static propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    tileSize: PropTypes.number,
    gridSize: PropTypes.number,
    moves: PropTypes.number,
    seconds: PropTypes.number,
  };

  static defaultProps = {
    tileSize: 90,
    gridSize: 4,
    moves: 0,
    seconds: 0,
  };

  constructor(props) {
    super(props);

    const { numbers, tileSize, gridSize, moves, seconds } = props;
    const tiles = [];
    numbers.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: this.props.tileSize,
        height: this.props.tileSize,
        number,
      };
    });

    this.state = {
      tiles,
      gameState: Symbol('GAME_IDLE'),
      moves,
      seconds,
    };

    this.onTileClick = this.onTileClick.bind(this);
  }

  render() {
    const { className, gridSize, tileSize } = this.props;

    return (
      <div className={className}>
        <div className="game-grid">
          <Grid
            gridSize={gridSize}
            tileSize={tileSize}
            tiles={this.state.tiles}
            onTileClick={this.onTileClick}
          />
        </div>
        <GameStats seconds={this.state.seconds} moves={this.state.moves} />
      </div>
    );
  }

  _isGameOver() {
    return false;
  }

  addTimer() {
    this.setState(prevState => {
      return { seconds: prevState.seconds + 1 };
    });
  }

  onTileClick(tile) {
    if (this.state.gameState === Symbol('GAME_OVER')) {
      return;
    }

    // Set Timer in case of first click
    if (this.state.moves === 0) {
      this.timerId = setInterval(
        () => {
          this.addTimer();
        },
        1000,
      );
    }

    const { gridSize } = this.props;

    // Find empty tile
    const emptyTile = this.state.tiles.find(t => t.number === gridSize ** 2);
    const emptyTileIndex = this.state.tiles.indexOf(emptyTile);

    // Find index of tile
    const tileIndex = this.state.tiles.findIndex(t => t.number === tile.number);

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(tile, emptyTile);
    if (d.neighbours) {
      let t = Array.from(this.state.tiles).map(t => ({ ...t }));

      invert(t, emptyTileIndex, tileIndex, [
        'top',
        'left',
        'row',
        'column',
        'tileId',
      ]);

      this.setState({
        tiles: t,
        moves: this.state.moves + 1,
      });
    }
  }
}

export default styled(Game)`
  width: ${props => props.tileSize * props.gridSize}px;
  height: ${props => props.tileSize * props.gridSize}px;
  position: relative;

  & div.game-grid{
    height:100%;
  }
`;
