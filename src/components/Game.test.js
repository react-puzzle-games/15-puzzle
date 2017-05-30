import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Game from './Game';
import * as GameStates from '../lib/game-status';

describe('Game', () => {
  const NUMBERS = [1, 4, 6, 7, 2, 8, 14, 13, 10, 9, 3, 5, 12, 11];

  describe('render', () => {
    it('should render correctly given a default grid', () => {
      const wrapper = shallow(<Game numbers={NUMBERS} original={NUMBERS} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should restart the game every time new numbers are passed', () => {
      const wrapper = shallow(<Game numbers={NUMBERS} original={NUMBERS} />);

      // Start the game
      wrapper.setState({
        gameState: GameStates.GAME_STARTED,
      });
      const oldTiles = wrapper.state('tiles');

      // Change numbers, this triggers new tiles
      wrapper.setProps({
        numbers: [2, 5, 1, 3, 4, 8, 14, 13, 10, 9, 3, 5, 12, 11],
      });

      expect(wrapper.state('gameState')).toEqual(GameStates.GAME_IDLE);
      expect(wrapper.state('tiles')).not.toEqual(oldTiles);
      expect(wrapper.state('moves')).toEqual(0);
      expect(wrapper.state('seconds')).toEqual(0);
    });
  });
});
