import React, { PropTypes } from "react";

const styles = {
  wrapper: {
    border: "1px solid #FFD1AA",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  number: {
    color: "#FFD1AA",
    fontSize: 22
  }
};

const Tile = ({ number, left, top, onClick, correct, width, height }) => {
  const compStyles = Object.assign({}, styles.wrapper, {
    left,
    top,
    width,
    height,
    backgroundColor: correct ? "#226666" : "#D4726A"
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Tile.defaultProps = {
  number: 0,
  correct: false
};

export default Tile;
