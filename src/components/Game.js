import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import { getTileCoords, distanceBetween, invert } from '../lib/utils';
import Grid from './Grid';
import GameStats from './GameStats';
import GitHubIcon from './GitHubIcon';
import ResetButton from './ResetButton';
import { GAME_IDLE, GAME_OVER, GAME_STARTED } from '../lib/game-status';

class Game extends Component {
  static propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    original: PropTypes.arrayOf(PropTypes.number),
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
    const tiles = this.generateTiles(numbers, gridSize, tileSize);

    this.state = {
      tiles,
      gameState: GAME_IDLE,
      moves,
      seconds,
    };

    this.onTileClick = this.onTileClick.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);

    document.addEventListener('keydown', this.keyDownListener);
  }

  // End game by pressing CTRL + ALT + F
  keyDownListener(key) {
    if (key.ctrlKey && key.altKey && key.code === 'KeyF') {
      const { original, gridSize, tileSize } = this.props;
      const solvedTiles = this.generateTiles(original, gridSize, tileSize).map((
        tile,
        index,
      ) => {
        tile.number = index + 1;
        return Object.assign({}, tile);
      });

      clearInterval(this.timerId);

      this.setState({
        gameState: GAME_OVER,
        tiles: solvedTiles,
      });
    }
  }

  generateTiles(numbers, gridSize, tileSize) {
    const tiles = [];

    numbers.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: this.props.tileSize,
        height: this.props.tileSize,
        number,
      };
    });

    return tiles;
  }

  componentWillReceiveProps(nextProps) {
    const { tileSize, gridSize } = this.props;
    const newTiles = this.generateTiles(nextProps.numbers, gridSize, tileSize);

    this.setState({
      gameState: GAME_IDLE,
      tiles: newTiles,
      moves: 0,
      seconds: 0,
    });

    clearInterval(this.timerId);
  }

  render() {
    const { className, gridSize, tileSize, onResetClick } = this.props;

    return (
      <div className={className}>
        <a
          className="github-icon"
          target="_blank"
          title="Source code on GitHub!"
          href="https://github.com/react-puzzle-games/15-puzzle"
        >
          <GitHubIcon />
        </a>
        <div className="game-grid">
          <Grid
            gridSize={gridSize}
            tileSize={tileSize}
            tiles={this.state.tiles}
            onTileClick={this.onTileClick}
          />
        </div>
        <GameStats
          seconds={this.state.seconds}
          moves={this.state.moves}
          gameState={this.state.gameState}
        />
        <ResetButton onResetClick={onResetClick} />
      </div>
    );
  }

  _isGameOver(tiles) {
    const correctedTiles = tiles.filter(tile => {
      return tile.tileId + 1 === tile.number;
    });

    if (correctedTiles.length === (this.props.gridSize) ** 2) {
      clearInterval(this.timerId);
      return true;
    } else {
      return false;
    }
  }

  _addTimer() {
    this.setState(prevState => {
      return { seconds: prevState.seconds + 1 };
    });
  }

  onTileClick(tile) {
    if (this.state.gameState === GAME_OVER) {
      return;
    }

    // Set Timer in case of first click
    if (this.state.moves === 0) {
      this.timerId = setInterval(
        () => {
          this._addTimer();
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
        gameState: this._isGameOver(t) ? GAME_OVER : GAME_STARTED,
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
    height:86%;
  }
`;
