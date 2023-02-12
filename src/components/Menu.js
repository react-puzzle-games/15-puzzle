// @ts-check

import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Alarm from "@material-ui/icons/Alarm";
import Moves from "@material-ui/icons/CompareArrows";
import Pause from "@material-ui/icons/Pause";
import Play from "@material-ui/icons/PlayArrow";
import New from "@material-ui/icons/PowerSettingsNew";
import Replay from "@material-ui/icons/Replay";
import PropTypes from "prop-types";
import React from "react";
import MediaQuery from "react-responsive";
import { GAME_PAUSED, GAME_STARTED } from "../lib/game-status";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(232, 232, 232)",
  },
  title: {
    color: "#000",
  },
});

function Menu(props) {
  const { seconds, moves, onResetClick, onPauseClick, onNewClick, gameState } =
    props;

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
          startIcon={<New className="menuIcon" />}
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
              <Play className="menuIcon" />
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
              <Moves />
            </Avatar>
          }
          label={
            <>
              <MediaQuery query="(min-width: 772px)" component="span">
                Moves Counter:
              </MediaQuery>
              <Typography component="span">{moves}</Typography>
            </>
          }
        />
      </Toolbar>
    </AppBar>
  );
}

Menu.propTypes = {
  seconds: PropTypes.number.isRequired,
  moves: PropTypes.number.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onNewClick: PropTypes.func.isRequired,
  gameState: PropTypes.symbol.isRequired,
};

export default Menu;
