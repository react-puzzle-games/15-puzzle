// @ts-check

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import React, { Component } from "react";
import {
  GAME_IDLE,
  GAME_OVER,
  GAME_PAUSED,
  GAME_STARTED,
} from "../lib/game-status";
import { distanceBetween, getTileCoords, invert } from "../lib/utils";
import Grid from "./Grid";
import Menu from "./Menu";

class Game extends Component {
  constructor(props) {
    super(props);

    const { numbers, tileSize, gridSize, moves = 0, seconds = 0 } = props;
    const tiles = this.generateTiles(numbers, gridSize, tileSize);

    this.state = {
      tiles,
      gameState: GAME_IDLE,
      moves,
      seconds,
      dialogOpen: false,
      snackbarOpen: false,
      snackbarText: "",
    };

    document.addEventListener("keydown", this.keyDownListener);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { tileSize, gridSize } = this.props;
    const newTiles = this.generateTiles(nextProps.numbers, gridSize, tileSize);

    this.setState({
      gameState: GAME_IDLE,
      tiles: newTiles,
      moves: 0,
      seconds: 0,
    });

    clearInterval(this.timerId);
  }

  // End game by pressing CTRL + ALT + F
  keyDownListener = (key) => {
    if (key.ctrlKey && key.altKey && key.code === "KeyF") {
      const { original, gridSize, tileSize } = this.props;
      const solvedTiles = this.generateTiles(original, gridSize, tileSize).map(
        (tile, index) => {
          tile.number = index + 1;
          return Object.assign({}, tile);
        }
      );

      clearInterval(this.timerId);

      this.setState({
        gameState: GAME_OVER,
        tiles: solvedTiles,
        dialogOpen: true,
      });
    }
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleSnackbarClose = (reason) => {
    this.setState({
      snackbarOpen: false,
    });
  };

  generateTiles(numbers, gridSize, tileSize) {
    const tiles = [];

    numbers.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: this.props.tileSize,
        height: this.props.tileSize,
        number,
      };
    });

    return tiles;
  }

  isGameOver(tiles) {
    const correctedTiles = tiles.filter((tile) => {
      return tile.tileId + 1 === tile.number;
    });

    if (correctedTiles.length === this.props.gridSize ** 2) {
      clearInterval(this.timerId);
      return true;
    } else {
      return false;
    }
  }

  addTimer() {
    this.setState((prevState) => {
      return { seconds: prevState.seconds + 1 };
    });
  }

  setTimer() {
    this.timerId = setInterval(() => {
      this.addTimer();
    }, 1000);
  }

  onPauseClick = () => {
    this.setState((prevState) => {
      let newGameState = null;
      let newSnackbarText = null;

      if (prevState.gameState === GAME_STARTED) {
        clearInterval(this.timerId);
        newGameState = GAME_PAUSED;
        newSnackbarText = "The game is currently paused.";
      } else {
        this.setTimer();
        newGameState = GAME_STARTED;
        newSnackbarText = "Game on!";
      }

      return {
        gameState: newGameState,
        snackbarOpen: true,
        snackbarText: newSnackbarText,
      };
    });
  };

  onTileClick = (tile) => {
    if (
      this.state.gameState === GAME_OVER ||
      this.state.gameState === GAME_PAUSED
    ) {
      return;
    }

    // Set Timer in case of first click
    if (this.state.moves === 0) {
      this.setTimer();
    }

    const { gridSize } = this.props;

    // Find empty tile
    const emptyTile = this.state.tiles.find((t) => t.number === gridSize ** 2);
    const emptyTileIndex = this.state.tiles.indexOf(emptyTile);

    // Find index of tile
    const tileIndex = this.state.tiles.findIndex(
      (t) => t.number === tile.number
    );

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(tile, emptyTile);
    if (d.neighbours) {
      let t = Array.from(this.state.tiles).map((t) => ({ ...t }));

      invert(t, emptyTileIndex, tileIndex, [
        "top",
        "left",
        "row",
        "column",
        "tileId",
      ]);

      const checkGameOver = this.isGameOver(t);

      this.setState({
        gameState: checkGameOver ? GAME_OVER : GAME_STARTED,
        tiles: t,
        moves: this.state.moves + 1,
        dialogOpen: checkGameOver ? true : false,
      });
    }
  };

  render() {
    const { gridSize, tileSize, onResetClick, onNewClick } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Menu
          seconds={this.state.seconds}
          moves={this.state.moves}
          onResetClick={onResetClick}
          onPauseClick={this.onPauseClick}
          onNewClick={onNewClick}
          gameState={this.state.gameState}
        />
        <Grid
          gridSize={gridSize}
          tileSize={tileSize}
          tiles={this.state.tiles}
          onTileClick={this.onTileClick}
        />
        <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose}>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogContent>
            You've solved the puzzle in {this.state.moves} moves in{" "}
            {this.state.seconds} seconds!
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={this.handleDialogClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarText}
          onClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default Game;
