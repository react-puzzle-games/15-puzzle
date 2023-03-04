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
import { GameStatus, GAME_PAUSED, GAME_STARTED } from "../lib/game-status";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(232, 232, 232)",
  },

  toolbar: {
    ["@media (max-width: 414px)"]: {
      justifyContent: "center",
    },
  },

  title: {
    color: "#000",
    flexGrow: 1,
  },
});

type Props = {
  seconds: number;
  moves: number;
  onResetClick: () => void;
  onPauseClick: () => void;
  onNewClick: () => void;
  gameState: GameStatus;
};

const Menu = (props: Props) => {
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
      <Toolbar className={classes.toolbar}>
        <MediaQuery query="(min-width: 772px)">
          <Typography className={classes.title} variant="h6" component="div">
            React Puzzle Games - 15 Puzzle
          </Typography>
        </MediaQuery>

        <Button
          aria-label="Start a new game"
          onClick={onNewClick}
          startIcon={<PowerSettingsNew className="menuIcon" />}
        >
          <MediaQuery query="(min-width: 772px)">
            <Typography component="span" variant="button">
              New game
            </Typography>
          </MediaQuery>
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
          <MediaQuery query="(min-width: 772px)">
            <Typography component="span" variant="button">
              {gameState === GAME_PAUSED ? "Continue" : "Pause"}
            </Typography>
          </MediaQuery>
        </Button>
        <Button
          aria-label="Reset game"
          onClick={onResetClick}
          startIcon={<Replay />}
        >
          <MediaQuery query="(min-width: 772px)" component="span">
            Reset game
          </MediaQuery>
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
