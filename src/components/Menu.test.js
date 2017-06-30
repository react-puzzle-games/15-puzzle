import renderer from 'react-test-renderer';
import React from 'react';
import Menu from './Menu';
import { GAME_STARTED } from '../lib/game-status';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('Menu renders correctly', () => {
  test('given default values', () => {
    const tree = renderer
      .create(
        <MuiThemeProvider>
          <Menu
            seconds={0}
            moves={0}
            onResetClick={() => {}}
            onPauseClick={() => {}}
            onNewClick={() => {}}
            gameState={GAME_STARTED}
          />
        </MuiThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
