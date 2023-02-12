// @ts-check

import React from 'react';
import renderer from 'react-test-renderer';
import GitHubIcon from './GitHubIcon';

test('GitHubIcon renders correctly', () => {
  const tree = renderer.create(<GitHubIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
