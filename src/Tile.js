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

const Tile = ({
  id,
  number,
  left,
  top,
  onMouseDown,
  onMouseUp,
  onMouseMove
}) => ({
  render() {
    const compStyles = Object.assign({}, styles.wrapper, {
      left,
      top,
    });

    return (
      <div style={compStyles}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}>
        <span style={styles.number}>{number}</span>
      </div>
    );
  }
});

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  number: 0,
};

export default Tile;
