import renderer from 'react-test-renderer';
import React from 'react';
import Game from './Game';

describe('Game', () => {
  it('should render correctly given a default grid', () => {
    const numbers = [1, 4, 6, 7, 2, 8, 14, 13, 10, 9, 3, 5, 12, 11];
    const original = numbers;
    const tree = renderer
      .create(<Game numbers={numbers} original={original} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
