import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    tileId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    number: PropTypes.number,
    onClick: PropTypes.func,
    correct: PropTypes.bool,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    number: 0,
    correct: false,
    visible: true,
  };

  render() {
    const { className, number, visible } = this.props;
    const classes = classnames({
      [className]: true,
      'tile-invisible': !visible,
    });

    return (
      <div className={classes} onClick={this.onClick}>
        <span className="tile-number">{number}</span>
      </div>
    );
  }

  onClick() {
    this.props.onClick(this.props);
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
  transition-property: top, left;
  transition-duration: .300s;
  transition-timing-function: ease-in-out;

  .tile-number {
    color: #FFD1AA;
    fontSize: 2em;
    user-select: none;
  }

  &.tile-invisible {
    display: none;
  }
`;

export const propTypes = Tile.propTypes;
