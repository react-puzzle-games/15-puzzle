// @ts-check

import { makeStyles } from "@material-ui/core";
import React from "react";
import Tile from "./Tile";

const useStyles = makeStyles({
  root: (props) => {
    return {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "500px",
    };
  },
  tile: (props) => {
    return {
      width: `${props.tileSize * props.gridSize}px`,
      height: `${props.tileSize * props.gridSize}px`,
      position: "relative",
      textAlign: "center",
    };
  },
});

const Grid = (props) => {
  const { tiles, onTileClick, gridSize } = props;
  const styles = useStyles(props);

  return (
    <div className={styles.root}>
      <div className={styles.tile}>
        {tiles.map((tile, index) => {
          return (
            <Tile
              {...tile}
              key={`tile-${index}`}
              correct={tile.tileId + 1 === tile.number}
              onClick={onTileClick}
              visible={tile.number < gridSize ** 2}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
