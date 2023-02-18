// @ts-check

import {
  AppBar,
  Avatar,
  Button,
  Chip,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Alarm,
  CompareArrows,
  Pause,
  PlayArrow,
  PowerSettingsNew,
  Replay,
} from "@material-ui/icons";
import React from "react";
import MediaQuery from "react-responsive";
import { GAME_PAUSED, GAME_STARTED } from "../lib/game-status";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(232, 232, 232)",
  },
  title: {
    color: "#000",
    flexGrow: 1,
  },
});

const Menu = (props) => {
  const {
    seconds = 0,
    moves = 0,
    onResetClick,
    onPauseClick,
    onNewClick,
    gameState,
  } = props;

  const classes = useStyles(props);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" component="div">
          React Puzzle Games - 15 Puzzle
        </Typography>

        <Button
          aria-label="Start a new game"
          onClick={onNewClick}
          startIcon={<PowerSettingsNew className="menuIcon" />}
        >
          <Typography component="span" variant="button">
            New game
          </Typography>
        </Button>
        <Button
          aria-label="Pause/Continue current game."
          onClick={onPauseClick}
          startIcon={
            gameState === GAME_PAUSED ? (
              <PlayArrow className="menuIcon" />
            ) : (
              <Pause className="menuIcon" />
            )
          }
          disabled={gameState !== GAME_STARTED && gameState !== GAME_PAUSED}
        >
          <Typography component="span" variant="button">
            {gameState === GAME_PAUSED ? "Continue" : "Pause"}
          </Typography>
        </Button>
        <Button
          aria-label="Reset game"
          onClick={onResetClick}
          startIcon={<Replay />}
        >
          Reset game
        </Button>
        <Chip
          avatar={
            <Avatar>
              <Alarm />
            </Avatar>
          }
          label={
            <>
              <MediaQuery query="(min-width: 772px)" component="span">
                Time Elapsed:
              </MediaQuery>
              <Typography component="span">{seconds}s</Typography>
            </>
          }
        />
        <Chip
          avatar={
            <Avatar>
              <CompareArrows />
            </Avatar>
          }
          label={
            <>
              <MediaQuery query="(min-width: 772px)" component="span">
                Moves so far:
              </MediaQuery>
              <Typography component="span">{moves}</Typography>
            </>
          }
        />
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
