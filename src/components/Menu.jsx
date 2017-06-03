import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

    .toolbar-title {
      display: none;
    }
  }

  @media (max-width: 578px) {
    .menu-button {
      margin: 10px 5px !important;
    }

    .menu-icon {
      margin-left: 0 !important;
    }

    .menu-icon--span {
      display: none !important;
    }
  }
`;

const Menu = ({ seconds, moves, onResetClick }) => (
  <StyledToolbar>
    <ToolbarTitle className="toolbar-title" text="React Puzzle Games - 15 Puzzle" />
    <ToolbarGroup>
      <RaisedButton
        className="menu-button"
        label="Project home"
        target="_blank"
        href="https://github.com/react-puzzle-games/15-puzzle/"
        icon={<GitHubIcon className="menuIcon" />}
      />
      <RaisedButton
        className="menu-button"
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

Menu.propTypes = {
  onResetClick: PropTypes.func.isRequired,
  seconds: PropTypes.number,
  moves: PropTypes.number
};

Menu.defaultProps = {
  seconds: 0,
  moves: 0
};

export default Menu;
