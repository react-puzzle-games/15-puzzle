import renderer from 'react-test-renderer';
import React from 'react';
import ResetButton from './ResetButton';

describe('ResetButton', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<ResetButton className="xyz" onResetClick={jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
