// @ts-check

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import renderer from 'react-test-renderer';
import Game from './Game';
injectTapEventPlugin();

test('Game renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <Game
          gridSize={4}
          tileSize={90}
          numbers={[]}
          onResetClick={() => {}}
          onNewClick={() => {}}
          original={[]}
        />
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
