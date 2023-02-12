// @ts-check

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('App renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <App
          level={{
            tileSet: [4, 6, 11, 1, 2, 16, 3, 15, 10, 9, 7, 13, 12, 14, 8, 5],
          }}
        />
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
