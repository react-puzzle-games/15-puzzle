import renderer from 'react-test-renderer';
import React from 'react';
import StopWatch from './StopWatch';

describe('StopWatch', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<StopWatch className="xyz" seconds={120} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
