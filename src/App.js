import React, { Component } from 'react';

import levels from './levels';
import Grid from './Grid';
import Tile from './Tile';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-content">
          <Grid>
            {this._renderTiles(0)}
          </Grid>
        </div>
      </div>
    );
  }

  _renderTiles(levelId) {
    return levels[levelId].tileSet.map((tileRow, rowIndex) => {
      return tileRow.map((tile, tileIndex) => {
        if (!tile) {
          return null;
        }

        return <Tile number={tile} left={tileIndex * 50} top={rowIndex * 50} />;
      });
    });
  }
}

export default App;
