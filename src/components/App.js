import React from 'react';
import styled from 'styled-components';

import { randomSubarray, range } from '../lib/utils';
import Tile from './Tile';

const TILE_SIZE = 90;
const GRID_SIZE = 4;

class App extends React.Component {
  constructor(props) {
    super(props);

    const randomTiles = this.props.levelData.tileSet.map(row => {
      return randomSubarray(row, row.length);
    });

    const tiles = range(GRID_SIZE ** 2).map(tileIndex => {
      const { row, column, top, left } = this._getTilePosition(tileIndex);
      const number = randomTiles[row][column];

      return {
        number,
        row,
        column,
        top,
        left,
        width: TILE_SIZE,
        height: TILE_SIZE,
        empty: number === null,
        correct: number === this.props.levelData.tileSet[row][column],
      };
    });

    this.state = {
      tiles,
      tileSet: this.props.levelData.tileSet,
      gameState: Symbol('GAME_IDLE'),
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.gameState !== Symbol('GAME_OVER') && this._isGameOver()) {
      this.setState({
        gameState: Symbol('GAME_OVER'),
      });
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="content">
          <div className="grid">
            {this._renderTiles()}
          </div>
        </div>
      </div>
    );
  }

  _renderTiles() {
    return this.state.tiles.map((tile, tileId) => {
      return tile.empty
        ? null
        : <Tile
            key={`tile-${tileId}`}
            {...tile}
            onClick={this._onTileClick.bind(this, tileId)}
          />;
    });
  }

  _getTilePosition(tileIndex) {
    const column = tileIndex % GRID_SIZE;
    const row = Math.floor(tileIndex / GRID_SIZE);

    return {
      column,
      row,
      left: column * TILE_SIZE,
      top: row * TILE_SIZE,
    };
  }

  _isTilePositionedOk(tileIndex, tileNumber) {
    const { row, column } = this._getTilePosition(tileIndex);
    return this.props.levelData.tileSet[row][column] === tileNumber;
  }

  _isGameOver() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.state.tileSet[i][j] !== this.state.tiles[i * j].number) {
          return false;
        }
      }
    }

    return true;
  }

  _onTileClick(tileId) {
    if (this.state.gameState === Symbol('GAME_OVER')) {
      return;
    }

    let { row, column, left, top } = this._getTilePosition(tileId);

    // Find empty
    const emptyTilePosition = this.state.tiles.findIndex(t => t.empty);
    let emptyTile = Object.assign(
      {
        width: TILE_SIZE,
        height: TILE_SIZE,
        empty: true,
      },
      this._getTilePosition(emptyTilePosition),
    );

    // Is this tale neighbouring the empty tile? If so, switch them.
    if (row === emptyTile.row && Math.abs(column - emptyTile.column) === 1) {
      left += TILE_SIZE * (emptyTile.column - column);
      column = emptyTile.column;
    } else if (
      column === emptyTile.column && Math.abs(row - emptyTile.row) === 1
    ) {
      top += TILE_SIZE * (emptyTile.row - row);
      row = emptyTile.row;
    } else {
      return;
    }

    // Re-render entire grid
    this.setState({
      tiles: this.state.tiles.map((tile, tileIndex) => {
        if (tileId === tileIndex) {
          return emptyTile;
        }

        if (emptyTilePosition === tileIndex) {
          const number = this.state.tiles[tileId].number;
          const correct = this._isTilePositionedOk(tileIndex, number);

          return Object.assign({}, tile, {
            number,
            empty: false,
            row,
            left,
            top,
            column,
            correct,
          });
        }

        return tile;
      }),
    });
  }
}

App.propTypes = {
  levelData: React.PropTypes.shape({
    moves: React.PropTypes.number.isRequired,
    tileSet: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.number),
    ).isRequired,
  }),
};

export default styled(App)`
  flex: 1;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .grid {
    width: ${props => TILE_SIZE * GRID_SIZE}px;
    height: ${props => TILE_SIZE * GRID_SIZE}px;
    position: relative;
  }
`;
