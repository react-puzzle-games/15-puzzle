// @ts-check

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Moves from 'material-ui/svg-icons/action/compare-arrows';
import New from 'material-ui/svg-icons/action/power-settings-new';
import Pause from 'material-ui/svg-icons/av/pause';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Replay from 'material-ui/svg-icons/av/replay';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
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
        <ToolbarTitle
          className="toolbarTitle"
          text="React Puzzle Games - 15 Puzzle"
        />
        <ToolbarGroup>
          <RaisedButton
            className="menuButton"
            label="New game"
            onClick={onNewClick}
            title="Start a new game"
            icon={<New className="menuIcon" />}
          />
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
          <Chip>
            <Avatar icon={<Alarm />} />
            <MediaQuery query="(min-width: 772px)" component="span">
              Time Elapsed:{' '}
            </MediaQuery>
            {seconds}s
          </Chip>
          <Chip>
            <Avatar icon={<Moves />} />
            <MediaQuery query="(min-width: 772px)" component="span">
              Moves Counter:{' '}
            </MediaQuery>
            {moves}
          </Chip>
        </ToolbarGroup>
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
