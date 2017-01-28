import React, { PropTypes } from 'react';

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
  },
  number: {
    color: 'orange',
  },
};

const Tile = ({ number, left, top }) => ({
  render() {
    const compStyles = Object.assign({}, styles.wrapper, {
      left,
      top,
    });

    return (
      <div style={compStyles}>
        <span style={styles.number}>{number}</span>
      </div>
    );
  }
});

Tile.propTypes = {
  number: PropTypes.number,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

Tile.defaultProps = {
  number: 0,
};

export default Tile;
