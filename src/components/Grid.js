import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Tile, { propTypes as TilePropTypes } from './Tile';

class Grid extends Component {
  static propTypes = {
    tiles: PropTypes.arrayOf(PropTypes.shape(TilePropTypes)).isRequired,
    gridSize: PropTypes.number.isRequired,
    tileSize: PropTypes.number.isRequired,
    onTileClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      className,
      tiles,
      onTileClick,
      gridSize,
    } = this.props;

    return (
      <div className={className}>
        {tiles.map((tile, tileId) => {
          return (
            <Tile
              {...tile}
              key={`tile-${tileId}`}
              correct={tileId + 1 === tile.number}
              onClick={onTileClick}
              visible={tile.number < gridSize ** 2}
            />
          );
        })}
      </div>
    );
  }
}

export default styled(Grid)`

`;
