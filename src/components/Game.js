import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import { getTileCoords, distanceBetween } from '../lib/utils';
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
        tileId: index,
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

  onTileClick(tileIndex) {
    if (this.state.gameState === Symbol('GAME_OVER')) {
      return;
    }

    const { gridSize, tileSize } = this.props;

    // Find index of 0 tile
    const zeroTileIndex = this.state.tiles.findIndex(
      t => t.number === gridSize ** 2,
    );

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(
      getTileCoords(tileIndex, gridSize, tileSize),
      getTileCoords(zeroTileIndex, gridSize, tileSize),
    );
    if (d.neighbours) {
      let t = Array.from(this.state.tiles).map(t => ({ ...t }));
      const sw = t[zeroTileIndex].number;
      t[zeroTileIndex].number = t[tileIndex].number;
      t[tileIndex].number = sw;

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
