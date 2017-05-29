import React, { Component } from 'react';
import PropTypes from 'prop-types';
import levelFactory from './../lib/levels-factory';
import Game from './Game';

class App extends Component {
  static propTypes = {
    level: PropTypes.shape({
      tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  };

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
      </div>
    );
  }
}

export default App;
