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
        const column = tileIndex % 4;
        const row = Math.floor(tileIndex / 4);
        const number = levels[0].tileSet[row][column];

        accum[tileIndex] = {
          number,
          empty: number === null,
          row,
          column,
          top: row * 50,
          left: column * 50,
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
              const { number, left, top } = this.state.tiles[_tileId];

              return (
                <Tile
                  key={`tile-${i}`}
                  number={number}
                  left={left}
                  top={top}
                  onClick={() => this._onTileClick(_tileId)}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }

  _onTileClick(tileId) {
    this.setState({
      tiles: Object.assign({}, this.state.tiles, {
        [tileId]: Object.assign({}, this.state.tiles[tileId], {
          top: this.state.tiles[tileId].top + 50,
        }),
      }),
    }, () => {
      this.forceUpdate();
    });
  }
}

export default App;
