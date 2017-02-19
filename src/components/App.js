import React from "react";
import styled from "styled-components";

import utils from "../lib/utils";
import Tile from "./Tile";

const TILE_CONSTANTS = {
  width: 90,
  height: 90,
  count: 4
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const tiles = utils.range((TILE_CONSTANTS.count) ** 2).map(tileIndex => {
      const { row, column, top, left } = this._getTilePosition(tileIndex);
      const number = this.props.levelData.tileSet[row][column];
      const isEmpty = number === null;

      return {
        number,
        row,
        column,
        top,
        left,
        width: TILE_CONSTANTS.width,
        height: TILE_CONSTANTS.height,
        empty: isEmpty,
        correct: false
      };
    });

    this.state = {
      tiles
    };
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="content">
          <div className="grid">
            {this._renderTiles()}
          </div>
        </div>
      </div>
    );
  }

  _renderTiles() {
    return this.state.tiles.map((tile, tileId) => {
      if (tile.empty) {
        return null;
      }

      return (
        <Tile
          key={`tile-${tileId}`}
          {...tile}
          onClick={this._onTileClick.bind(this, tileId)}
        />
      );
    });
  }

  _getTilePosition(tileIndex) {
    const column = tileIndex % TILE_CONSTANTS.count;
    const row = Math.floor(tileIndex / TILE_CONSTANTS.count);

    return {
      column,
      row,
      left: column * TILE_CONSTANTS.width,
      top: row * TILE_CONSTANTS.height,
      width: TILE_CONSTANTS.width,
      height: TILE_CONSTANTS.height
    };
  }

  _isTilePositionedOk(tileIndex, tileNumber) {
    const { row, column } = this._getTilePosition(tileIndex);
    return this.props.levelData.tileSet[row][column] === tileNumber;
  }

  _onTileClick(tileId) {
    let { row, column, left, top } = this._getTilePosition(tileId);

    // Find empty
    const emptyTilePosition = this.state.tiles.findIndex(t => t.empty);
    let emptyTile = Object.assign(this._getTilePosition(emptyTilePosition), {
      empty: true
    });

    // Is this tale neighbouring the empty tile? If so, switch them.
    if (row === emptyTile.row && Math.abs(column - emptyTile.column) === 1) {
      left += TILE_CONSTANTS.width * (emptyTile.column - column);
      column = emptyTile.column;
    } else if (
      column === emptyTile.column && Math.abs(row - emptyTile.row) === 1
    ) {
      top += TILE_CONSTANTS.height * (emptyTile.row - row);
      row = emptyTile.row;
    } else {
      return;
    }

    // Re-render entire grid
    this.setState({
      tiles: this.state.tiles.map((tile, tileIndex) => {
        if (tileId === tileIndex) {
          return emptyTile;
        }

        if (emptyTilePosition === tileIndex) {
          const number = this.state.tiles[tileId].number;
          const correct = this._isTilePositionedOk(tileIndex, number);

          return Object.assign({}, tile, {
            number,
            empty: false,
            row,
            left,
            top,
            column,
            correct
          });
        }

        return tile;
      })
    });
  }
}

App.propTypes = {
  levelData: React.PropTypes.shape({
    moves: React.PropTypes.number.isRequired,
    tileSet: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.number)
    ).isRequired
  })
};

export default styled(App)`
  flex: 1;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .grid {
    width: ${props => TILE_CONSTANTS.height * TILE_CONSTANTS.count}px;
    height: ${props => TILE_CONSTANTS.height * TILE_CONSTANTS.count}px;
    position: relative;
  }
`;
