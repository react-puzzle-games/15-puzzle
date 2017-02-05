import React, { PropTypes } from 'react';

import { tile as tileConstants } from './constants';

const styles = {
  wrapper: {
    width: tileConstants.width,
    height: tileConstants.height,
    border: '1px solid #FFD1AA',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  number: {
    color: '#FFD1AA',
    fontSize: 22,
  },
};

const Tile = ({ number, left, top, onClick, correct }) => {
  const compStyles = Object.assign({}, styles.wrapper, {
    left,
    top,
    backgroundColor: correct ? '#226666' : '#D4726A',
  });

  return (
    <div style={compStyles} onClick={onClick}>
      <span style={styles.number}>{number}</span>
    </div>
  );
};

Tile.propTypes = {
  number: PropTypes.number,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  correct: PropTypes.bool.isRequired,
};

Tile.defaultProps = {
  number: 0,
  correct: false,
};

export default Tile;
