import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Tile, { propTypes as TilePropTypes } from './Tile';
import ZeroTile from './ZeroTile';

class Grid extends Component {
  static propTypes = {
    tiles: PropTypes.arrayOf(PropTypes.shape(TilePropTypes)).isRequired,
    onTileClick: PropTypes.func.isRequired,
  };

  render() {
    const { className, tiles, onTileClick } = this.props;

    return (
      <div className={className}>
        {tiles.map((tile, tileId) => {
          const TileComponent = tile.number === 0 ? ZeroTile : Tile;
          return (
            <TileComponent
              {...tile}
              key={`tile-${tileId}-${tile.number}`}
              correct={tile.number === tileId}
              onClick={onTileClick}
            />
          );
        })}
      </div>
    );
  }
}

export default styled(Grid)`

`;
