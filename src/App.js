import React, { Component, PropTypes } from 'react';

import levels from './levels';
import { range } from './utils';
import { tile as tileConstants } from './constants';
import Grid from './Grid';
import Tile from './Tile';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelId: this.props.levelId,
      tiles: range(tileConstants.count ** 2).reduce((accum, tileIndex) => {
        const { row, column, top, left } = this._getTilePosition(tileIndex);
        const number = levels[this.props.levelId].tileSet[row][column];
        const isEmpty = number === null;

        accum[tileIndex] = {
          number,
          row,
          column,
          top,
          left,
          empty: isEmpty,
        };

        return accum;
      }, {}),
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-content">
          <Grid>
            {Object.keys(this.state.tiles).map((tileId, i) => {
              const _tileId = Number.parseInt(tileId, 10);
              const tile = this.state.tiles[_tileId];

              if (tile.empty) {
                return null;
              }

              return (
                <Tile
                  key={`tile-${tileId}`}
                  number={tile.number}
                  left={tile.left}
                  top={tile.top}
                  onClick={this._onTileClick.bind(this, _tileId)}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    );
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

    this.setState({
      tiles: Object.assign({}, this.state.tiles, {
        [tileId]: emptyTile,
        [emptyTilePosition]: {
          number: this.state.tiles[tileId].number,
          empty: false,
          row,
          left,
          top,
          column,
        },
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
