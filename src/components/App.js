import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Game from './Game';
import GitHubIcon from './GitHubIcon';

class App extends Component {
  static propTypes = {
    level: PropTypes.shape({
      tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  };

  render() {
    const { className, level } = this.props;

    return (
      <div className={className}>
        <Game gridSize={4} tileSize={90} numbers={level.tileSet} />
        <a
          className="github-icon"
          target="_blank"
          title="Source code on GitHub!"
          href="https://github.com/react-puzzle-games/15-puzzle"
        >
          <GitHubIcon />
        </a>
      </div>
    );
  }
}

export default styled(App)`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;

  & a.github-icon {
    display: block;
    position: absolute;
    right: 48.2%;
    top: 32px;
  }
`;
