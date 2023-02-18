// @ts-check

import PropTypes from "prop-types";
import React, { Component } from "react";
import levelFactory from "./../lib/levels-factory";
import Footer from "./Footer";
import Game from "./Game";

class App extends Component {
  constructor(props) {
    super(props);

    const level = props.level ? props.level : levelFactory(4 ** 2);
    const originalLevel = Object.assign({}, level);

    this.state = {
      original: originalLevel,
      level,
    };
  }

  onResetClick = () => {
    this.setState({
      level: {
        tileSet: this.state.original.tileSet,
      },
    });
  };

  onNewClick = () => {
    const newLevel = levelFactory(4 ** 2);
    const newOriginalLevel = Object.assign({}, newLevel);
    this.setState({
      level: newLevel,
      original: newOriginalLevel,
    });
  };

  render() {
    return (
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Game
          gridSize={4}
          tileSize={90}
          numbers={this.state.level.tileSet}
          onResetClick={this.onResetClick}
          onNewClick={this.onNewClick}
          original={this.state.original.tileSet}
        />
        <Footer />
      </main>
    );
  }
}

App.propTypes = {
  level: PropTypes.shape({
    tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default App;
