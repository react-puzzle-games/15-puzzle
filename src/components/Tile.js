import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    tileId: PropTypes.number.isRequired,
    number: PropTypes.number,
    onClick: PropTypes.func,
    correct: PropTypes.bool,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  };

  static defaultProps = {
    number: 0,
    correct: false,
  };

  render() {
    const { className, number } = this.props;

    return (
      <div className={className} onClick={this.onClick}>
        <span className="tile-number">{number}</span>
      </div>
    );
  }

  onClick() {
    this.props.onClick(this.props.tileId);
  }
}

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
  background-color: ${props => props.correct ? '#226666' : '#D4726A'};

  .tile-number {
    color: #FFD1AA;
    fontSize: 2em;
  }
`;

export const propTypes = Tile.propTypes;
