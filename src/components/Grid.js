import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Tile, { propTypes as TilePropTypes } from './Tile';

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
          return (
            <Tile
              {...tile}
              key={`tile-${tileId}`}
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
