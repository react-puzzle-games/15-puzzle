import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile, { propTypes as TilePropTypes } from './Tile';

const Grid = ({ className, tiles, onTileClick, gridSize }) => (
  <div className={className}>
    <div className="tiles">
      {tiles.map((tile, tileId) => (
        <Tile
          {...tile}
          key={`tile-${tileId}`}
          correct={tile.tileId + 1 === tile.number}
          onClick={onTileClick}
          visible={tile.number < gridSize ** 2}
        />
      ))}
    </div>
  </div>
);

Grid.propTypes = {
  className: PropTypes.string.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.shape(TilePropTypes)).isRequired,
  gridSize: PropTypes.number.isRequired,
  onTileClick: PropTypes.func.isRequired
};

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
