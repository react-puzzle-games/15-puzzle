import React, { Component } from 'react';
import levelFactory from './../lib/levels-factory';
import Game from './Game';
import Footer from './Footer';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);

    const level = props.level ? props.level : levelFactory(4 ** 2);
    const originalLevel = Object.assign({}, level);

    this.state = {
      original: originalLevel,
      level: level,
    };

    this.onResetClick = this.onResetClick.bind(this);
  }

  onResetClick() {
    this.setState({
      level: {
        tileSet: this.state.original.tileSet,
      },
    });
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <Game
          gridSize={4}
          tileSize={90}
          numbers={this.state.level.tileSet}
          onResetClick={this.onResetClick}
          original={this.state.original.tileSet}
        />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  level: PropTypes.shape({
    tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default styled(App)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
