import React, { PropTypes } from 'react';

import './Tile.css';

const styles = {
  wrapper: {
    width: 50,
    height: 50,
    border: '5px solid chocolate',
    backgroundColor: 'green',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  number: {
    color: 'orange',
  },
};

const Tile = ({
  number,
  left,
  top,
  onClick,
}) => {
  const compStyles = Object.assign({}, styles.wrapper, {
    left,
    top,
  });

  return (
    <div style={compStyles} className="tile-item" onClick={onClick}>
      <span style={styles.number}>{number}</span>
    </div>
  );
};

Tile.propTypes = {
  number: PropTypes.number,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  number: 0,
};

export default Tile;
