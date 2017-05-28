import renderer from 'react-test-renderer';
import React from 'react';
import GameStats from './GameStats';
import * as GameStates from '../lib/game-status';

describe('GameStats', () => {
  it('should render correctly given a GAME_OVER state', () => {
    const tree = renderer
      .create(
        <GameStats moves={30} seconds={120} gameState={GameStates.GAME_OVER} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly given a GAME_STARTED state', () => {
    const tree = renderer
      .create(
        <GameStats moves={0} seconds={1} gameState={GameStates.GAME_STARTED} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly given a GAME_IDLE state', () => {
    const tree = renderer
      .create(
        <GameStats moves={12} seconds={60} gameState={GameStates.GAME_IDLE} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
