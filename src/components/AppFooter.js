import React, { Component } from 'react';
import styled from 'styled-components';

class AppFooter extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <h5>
          Made with <span style={{ color: 'red' }}>♥</span> by <a
            target="_blank"
            href="https://twitter.com/ovidiubute"
          >
            Ovidiu
          </a> using React and create-react-app boilerplate
        </h5>
        <div className="links">
          <a
            target="_blank"
            href="https://github.com/react-puzzle-games/15-puzzle"
          >
            <img
              src="assets/github-10-xxl.png"
              width="30"
              height="30"
              alt="Github"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default styled(AppFooter)`
  font-size: 0.9em;
  font-style: italic;
  background-color: #000;
  color: #fff;
  position:absolute;
  bottom: 0;
  width:100%;

& > h5 {
  margin-left: 8px;
  text-align: center;
}

& > .links {
  margin-left: 8px;
  text-align: center;
}
`;
