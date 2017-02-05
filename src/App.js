import React, { Component } from 'react';

import levels from './levels';
import Grid from './Grid';
import Tile from './Tile';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelId: 0,
      tiles: Array.from({length: 16}, (v, i) => Number.parseInt(i, 10)).reduce((accum, tileIndex) => {
        const { row, column, top, left } = this._getTilePosition(tileIndex);
        const number = levels[0].tileSet[row][column];

        if (number === null) {
          accum[tileIndex] = {
            empty: true,
          }
        }

        accum[tileIndex] = Object.assign({}, accum[tileIndex], {
          number,
          row,
          column,
          top,
          left,
        });

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
                  onClick={() => this._onTileClick(_tileId)}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }

  _getTilePosition(tileIndex) {
    const column = tileIndex % 4;
    const row = Math.floor(tileIndex / 4);

    return {
      column,
      row,
      left: column * 50,
      top: row * 50,
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
      left += 50 * (emptyTile.column - column);
      column = emptyTile.column;
    } else if (column === emptyTile.column && Math.abs(row - emptyTile.row) === 1) {
      top += 50 * (emptyTile.row - row);
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

export default App;
