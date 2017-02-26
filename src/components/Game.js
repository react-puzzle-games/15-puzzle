import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

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

    const tiles = [];
    this.props.numbers.forEach((number, index) => {
      tiles[index] = {
        ...this._getTileCoords(index),
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
    return (
      <div className={this.props.className}>
        <div className="content">
          <Grid tiles={this.state.tiles} onTileClick={this.onTileClick} />
        </div>
      </div>
    );
  }

  _getTileCoords(index) {
    const column = index % this.props.gridSize;
    const row = index / this.props.gridSize << 0;

    return {
      column,
      row,
      left: column * this.props.tileSize,
      top: row * this.props.tileSize,
    };
  }

  _isGameOver() {
    return false;
  }

  onTileClick(tileIndex) {
    if (this.state.gameState === Symbol('GAME_OVER')) {
      return;
    }

    const { row, column } = this._getTileCoords(tileIndex);

    // Find index of 0 tile
    const zeroTileIndex = this.state.tiles.findIndex(t => t.number === 0);
    const { row: zeroRow, column: zeroColumn } = this._getTileCoords(
      zeroTileIndex,
    );

    // Is this tale neighbouring the zero tile? If so, switch them.
    const sameRow = row === zeroRow;
    const sameColumn = column === zeroColumn;
    const diffColumn = Math.abs(column - zeroColumn) === 1;
    const diffRow = Math.abs(row - zeroRow) === 1;
    const sameRowDiffColumn = sameRow && diffColumn;
    const sameColumnDiffRow = sameColumn && diffRow;
    if (sameRowDiffColumn || sameColumnDiffRow) {
      let t = Array.from(this.state.tiles);
      const sw = t[zeroTileIndex].number;
      t[zeroTileIndex].number = t[tileIndex].number;
      t[tileIndex].number = sw;

      this.setState({ tiles: t });
    }
  }
}

export default styled(Game)`
  width: ${props => props.tileSize * props.gridSize}px;
  height: ${props => props.tileSize * props.gridSize}px;
  position: relative;
`;
