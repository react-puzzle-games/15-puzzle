import React, { Component, PropTypes } from 'react';

import levels from './levels';
import { range } from './utils';
import { tile as tileConstants } from './constants';
import Grid from './Grid';
import Tile from './Tile';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelId: this.props.levelId,
      tiles: range(tileConstants.count ** 2).map(tileIndex => {
        const { row, column, top, left } = this._getTilePosition(tileIndex);
        const number = levels[this.props.levelId].tileSet[row][column];
        const isEmpty = number === null;

        return {
          number,
          row,
          column,
          top,
          left,
          empty: isEmpty,
        };
      }),
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Grid>
            {this._renderTiles()}
          </Grid>
        </div>
      </div>
    );
  }

  _renderTiles() {
    return this.state.tiles.map((tile, tileId) => {
      if (tile.empty) {
        return null;
      }

      return (
        <Tile
          key={`tile-${tileId}`}
          number={tile.number}
          left={tile.left}
          top={tile.top}
          onClick={this._onTileClick.bind(this, tileId)}
        />
      );
    });
  }

  _getTilePosition(tileIndex) {
    const column = tileIndex % tileConstants.count;
    const row = Math.floor(tileIndex / tileConstants.count);

    return {
      column,
      row,
      left: column * tileConstants.width,
      top: row * tileConstants.height,
    };
  }

  _onTileClick(tileId) {
    let { row, column, left, top } = this._getTilePosition(tileId);

    // Find empty
    const emptyTilePosition = Object.keys(this.state.tiles).findIndex(
      k => this.state.tiles[k].empty
    );
    let emptyTile = this._getTilePosition(emptyTilePosition);
    emptyTile.empty = true;

    // Is this tale neighbouring the empty tile? If so, switch them.
    if (row === emptyTile.row && Math.abs(column - emptyTile.column) === 1) {
      left += tileConstants.width * (emptyTile.column - column);
      column = emptyTile.column;
    } else if (column === emptyTile.column && Math.abs(row - emptyTile.row) === 1) {
      top += tileConstants.height * (emptyTile.row - row);
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
          return {
            number: this.state.tiles[tileId].number,
            empty: false,
            row,
            left,
            top,
            column,
          };
        }

        return tile;
      }),
    });
  }
}

App.propTypes = {
  levelId: PropTypes.number,
};

App.defaultProps = {
  levelId: 0,
};

export default App;
