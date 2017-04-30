import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

class Moves extends Component {
  static propTypes = {
    moves: PropTypes.number.isRequired,
  };

  render() {
    const { className, moves } = this.props;

    return (
      <div className={className}>
        Moves counter: {moves}
      </div>
    );
  }
}

export default styled(Moves)`
  margin: 5px;
`;
