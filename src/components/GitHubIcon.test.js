import renderer from 'react-test-renderer';
import React from 'react';
import GitHubIcon from './GitHubIcon';

test('GitHubIcon renders correctly', () => {
  const tree = renderer.create(<GitHubIcon />).toJSON();
  expect(tree).toMatchSnapshot();
});
