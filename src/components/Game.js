import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import { getTileCoords, distanceBetween, invert } from '../lib/utils';
import Grid from './Grid';

class Game extends Component {
  static propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    tileSize: PropTypes.number,
    gridSize: PropTypes.number,
  };

  static defaultProps = {
    tileSize: 90,
    gridSize: 4,
  };

  constructor(props) {
    super(props);

    const { numbers, tileSize, gridSize } = props;
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
    };

    this.onTileClick = this.onTileClick.bind(this);
  }

  render() {
    const { className, gridSize, tileSize } = this.props;

    return (
      <div className={className}>
        <div className="content">
          <Grid
            gridSize={gridSize}
            tileSize={tileSize}
            tiles={this.state.tiles}
            onTileClick={this.onTileClick}
          />
        </div>
      </div>
    );
  }

  _isGameOver() {
    return false;
  }

  onTileClick(tile) {
    if (this.state.gameState === Symbol('GAME_OVER')) {
      return;
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
      });
    }
  }
}

export default styled(Game)`
  width: ${props => props.tileSize * props.gridSize}px;
  height: ${props => props.tileSize * props.gridSize}px;
  position: relative;
`;
