import React, { Component } from 'react';
import styled from 'styled-components';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Moves from 'material-ui/svg-icons/action/compare-arrows';
import Replay from 'material-ui/svg-icons/av/replay';
import MediaQuery from 'react-responsive';
import GitHubIcon from './GitHubIcon';

const StyledToolbar = styled(Toolbar)`

@media (max-width: 1094px) {
  
  & {
    justify-content: center !important;
  }

  .toolbarTitle {
    display: none;
  }

}

@media (max-width: 578px) {

  .menuButton {
    margin: 10px 5px !important;
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
    const { seconds, moves, onResetClick } = this.props;

    return (
      <StyledToolbar className="toolbar">
        <ToolbarTitle
          className="toolbarTitle"
          text="React Puzzle Games - 15 Puzzle"
        />
        <ToolbarGroup>
          <RaisedButton
            className="menuButton"
            label="Project home"
            target="_blank"
            href="https://github.com/react-puzzle-games/15-puzzle/"
            icon={<GitHubIcon className="menuIcon" />}
          />
          <RaisedButton
            className="menuButton"
            label="Reset game"
            onTouchTap={onResetClick}
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

export default Menu;
