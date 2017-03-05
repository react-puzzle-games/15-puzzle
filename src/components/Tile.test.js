import renderer from 'react-test-renderer';
import React from 'react';
import Tile from './Tile';

describe('Tile renders correctly', () => {
  test('given custom number', () => {
    const tree = renderer
      .create(
        <Tile
          tileId={50}
          left={0}
          top={0}
          number={13}
          width={90}
          height={90}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('given default number', () => {
    const tree = renderer
      .create(
        <Tile tileId={18} left={-40} top={-20} width={120} height={120} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('given correct prop', () => {
    const tree = renderer
      .create(
        <Tile
          tileId={13}
          left={0}
          top={50}
          correct={true}
          width={90}
          height={90}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('given visible prop', () => {
    const tree = renderer
      .create(
        <Tile
          tileId={4}
          left={30}
          top={0}
          visible={false}
          width={30}
          height={30}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
