import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import Game from './Game';

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
`;
