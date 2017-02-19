import React from "react";
import styled from "styled-components";

const Tile = props => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <span className="tile-number">{props.number}</span>
    </div>
  );
};

Tile.propTypes = {
  number: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired,
  correct: React.PropTypes.bool.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired
};

Tile.defaultProps = {
  number: 0,
  correct: false
};

export default styled(Tile)`
  border: 1px solid #FFD1AA;
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.correct ? "#226666" : "#D4726A"};

  .tile-number {
    color: #FFD1AA;
    fontSize: 22px;
  }
`;
