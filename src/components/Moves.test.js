import renderer from 'react-test-renderer';
import React from 'react';
import Moves from './Moves';

describe('Moves renders correctly', () => {
  test('before start', () => {
    const tree = renderer.create(<Moves moves={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('mid-game', () => {
    const tree = renderer.create(<Moves moves={42} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
