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
        <div className="tiles">
          {tiles.map((tile, tileId) => {
            return (
              <Tile
                {...tile}
                key={`tile-${tileId}`}
                correct={tile.tileId + 1 === tile.number}
                onClick={onTileClick}
                visible={tile.number < gridSize ** 2}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default styled(Grid)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  & .tiles {
    width: ${props => props.tileSize * props.gridSize}px;
    height: ${props => props.tileSize * props.gridSize}px;
    position: relative;
    text-align: center;
  }
`;
