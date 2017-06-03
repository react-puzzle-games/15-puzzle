import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Tile extends Component {
  onClick = () => {
    this.props.onClick({
      number: this.props.number
    });
  };

  render() {
    const { className, number, visible } = this.props;
    const classes = classnames({
      [className]: true,
      'tile-invisible': !visible
    });

    return (
      <div className={classes} onClick={this.onClick}>
        <span className="tile-number">{number}</span>
      </div>
    );
  }
}

Tile.propTypes = {
  tileId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  number: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  correct: PropTypes.bool,
  visible: PropTypes.bool
};

Tile.defaultProps = {
  number: 0,
  correct: false,
  visible: true
};

export default styled(Tile)`
  border: 1px solid #ffd1aa;
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
  background-color: ${props => (props.correct ? '#226666' : '#D4726A')};
  transition-property: top, left, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;

  .tile-number {
    color: #ffd1aa;
    font-weight: 400;
    font-size: 1.8em;
    user-select: none;
  }

  &.tile-invisible {
    display: none;
  }
`;

// Export this for easier unit-testing
export { Tile as Component };

export const propTypes = Tile.propTypes;
