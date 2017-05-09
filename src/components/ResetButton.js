import React, { Component } from 'react';
import styled from 'styled-components';

class ResetButton extends Component {
  render() {
    const { className, onResetClick } = this.props;

    return (
      <div className={className}>
        <button onClick={onResetClick}>Reset Game</button>
      </div>
    );
  }
}

export default styled(ResetButton)`
    text-align: center;

    & button {
        border-radius: 8px;
        padding: 6px 12px;
        background: linear-gradient(to bottom, #ff6600 0%, #ff6600 100%);
        font-weight: 300;
        font-size: .8em;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    & button:active {
    box-shadow: inset 0px 1px 3px 2px rgba(0, 0, 0, 0.4);
        cursor: pointer;
    }

    & button:hover {
    text-decoration: none;
    color: #fff;
    background: linear-gradient(to bottom, #226666 0%, #000 100%);
    }

`;
