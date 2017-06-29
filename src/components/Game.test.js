import renderer from 'react-test-renderer';
import React from 'react';
import Game from './Game';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
