import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Game from './Game';

const App = ({ className, level }) => (
  <div className={className}>
    <Game gridSize={4} tileSize={90} numbers={level.tileSet} />
  </div>
);

App.propTypes = {
  level: PropTypes.shape({
    tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default styled(App)`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
