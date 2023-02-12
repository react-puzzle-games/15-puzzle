// @ts-check

import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import RaisedButton from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import Alarm from '@material-ui/icons/Alarm';
import Moves from '@material-ui/icons/CompareArrows';
import Pause from '@material-ui/icons/Pause';
import Play from '@material-ui/icons/PlayArrow';
import New from '@material-ui/icons/PowerSettingsNew';
import Replay from '@material-ui/icons/Replay';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import { GAME_PAUSED, GAME_STARTED } from '../lib/game-status';

const StyledToolbar = styled(Toolbar)`

@media (max-width: 1190px) {
  
  & {
    justify-content: center !important;
  }

  .toolbarTitle {
    display: none;
  }

}

@media (max-width: 890px) {

  .menuButton {
    margin: 10px 5px !important;
    min-width: 36px !important;
  }

  .menuIcon {
    margin-left: 0px !important;
  }

  .menuIcon+span {
    display: none !important;
  }

}

`;

class Menu extends Component {
  render() {
    const {
      seconds,
      moves,
      onResetClick,
      onPauseClick,
      onNewClick,
      gameState,
    } = this.props;

    return (
      <StyledToolbar className="toolbar">
        <Typography variant="h6" component="div" >
        React Puzzle Games - 15 Puzzle
          </Typography>
        

          <RaisedButton
            className="menuButton"
            onClick={onNewClick}
            title="Start a new game"
            icon={<New className="menuIcon" />}
          />
          New game
          <RaisedButton
            className="menuButton"
            label={gameState === GAME_PAUSED ? 'Continue' : 'Pause'}
            onClick={onPauseClick}
            icon={
              gameState === GAME_PAUSED
                ? <Play className="menuIcon" />
                : <Pause className="menuIcon" />
            }
            title="Pause/Continue current game."
            disabled={gameState !== GAME_STARTED && gameState !== GAME_PAUSED}
          />
          <RaisedButton
            className="menuButton"
            label="Reset game"
            onClick={onResetClick}
            title="Reset game"
            icon={<Replay className="menuIcon" />}
          />
          <Chip avatar={<Avatar><Alarm /></Avatar>} label={
          
          <MediaQuery query="(min-width: 772px)" component="span">
              Time Elapsed:{' '}{seconds}s
            </MediaQuery>
          }/>
            
          <Chip avatar={<Avatar><Moves /></Avatar>} label={

<MediaQuery query="(min-width: 772px)" component="span">
              Moves Counter:{' '}{moves}
            </MediaQuery>
            
          }/>
      </StyledToolbar>
    );
  }
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
