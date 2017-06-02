import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Game from './Game';
import Tile from './Tile';
import * as GameStates from '../lib/game-status';

injectTapEventPlugin();

describe('Game', () => {
  const NUMBERS = [1, 4, 6, 7, 2, 8, 14, 13, 10, 9, 3, 5, 12, 11];

  describe('render', () => {
    it('should match a shallow render snapshot', () => {
      const wrapper = shallow(
        <Game
          numbers={NUMBERS}
          className="random-cls"
          onResetClick={() => {}}
          onTileClick={() => {}}
          original={NUMBERS}
        />,
      );
      expect(wrapper.getNode()).toMatchSnapshot();
    });

    it('should ');
  });

  describe('callbacks', () => {
    it('should restart the game every time new numbers are passed', () => {
      const wrapper = shallow(
        <Game
          numbers={NUMBERS}
          className="random-cls"
          onResetClick={() => {}}
          onTileClick={() => {}}
          original={NUMBERS}
        />,
      );

      // Start the game
      wrapper.setState({
        gameState: GameStates.GAME_STARTED,
      });
      const oldTiles = wrapper.state('tiles');

      // Change numbers, this triggers new tiles
      wrapper.setProps({
        numbers: [2, 5, 1, 3, 4, 8, 14, 13, 10, 9, 3, 5, 12, 11],
      });

      expect(wrapper.state('tiles')).not.toEqual(oldTiles);
      expect(wrapper.state).toMatchObject({
        gameState: GameStates.GAME_IDLE,
        moves: 0,
        seconds: 0,
      });
    });

    it('should not respond to clicks if game is over', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <Game
            numbers={NUMBERS}
            className="random-cls"
            onResetClick={() => {}}
            onTileClick={() => {}}
            original={NUMBERS}
          />
        </MuiThemeProvider>,
      );

      wrapper.setState({
        gameState: GameStates.GAME_OVER,
      });

      const expectedTiles = wrapper.state('tiles');

      // Click the tile that can move, check state that it didn't
      wrapper.find({ number: 11 }).simulate('click');

      expect(wrapper.state('tiles')).toEqual(expectedTiles);
    });
  });
});
