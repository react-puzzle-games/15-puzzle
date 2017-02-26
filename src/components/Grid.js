import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Tile, { propTypes as TilePropTypes } from './Tile';
import ZeroTile from './ZeroTile';

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
          const TileComponent = tile.number !== gridSize ** 2 ? Tile : ZeroTile;

          return (
            <div key={`tile-${tileId}`}>
              <TileComponent
                {...tile}
                correct={tile.number - tileId === 1}
                onClick={onTileClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default styled(Grid)`

`;
