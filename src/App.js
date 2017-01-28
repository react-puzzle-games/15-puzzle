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
      draggingTileId: 0,
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

        const tileId = tileIndex * rowIndex;
        return (
          <Tile
            id={tileId}
            key={`tile-${(tileIndex + 1) * (rowIndex + 1)}`}
            number={tile}
            left={tileIndex * 50}
            top={rowIndex * 50}
            onMouseDown={this._onMouseDown.bind(this, tileId)}
            onMouseUp={this._onMouseUp.bind(this, tileId)}
            onMouseMove={this._onMouseMove.bind(this, tileId)}
          />
        );
      });
    });
  }

  _onMouseDown(tileId, proxiedEvent) {
    proxiedEvent.preventDefault();

    this.setState({
      draggingTileId: tileId,
    });
  }

  _onMouseUp(tileId, proxiedEvent) {
    proxiedEvent.preventDefault();

    this.setState({
      draggingTileId: 0,
    });
  }

  _onMouseMove(tileId, proxiedEvent) {
    proxiedEvent.preventDefault();

    console.log(tileId, proxiedEvent.nativeEvent.movementX, proxiedEvent.nativeEvent.movementY);
  }
}

export default App;
